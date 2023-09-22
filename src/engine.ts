import {ControlPlane} from './control-plane.js'
import {Direction, Elevator, ElevatorRequest, RequestStatus} from './interfaces.js'
import {INTERVAL_TICK} from './constants.js'

/**
 * Engine logic for entire system
 * Relies on control pane for requests management and other system parts
 * So far, only enables the engine, but can be easily improved to be able to disable
 */
export class ElevatorEngine {

    private readonly control: ControlPlane
    private interval: NodeJS.Timeout | undefined

    constructor(control: ControlPlane) {
        this.control = control
    }

    /**
     * Starts the engine using control plane
     * Pretty much an interval which emulates event loop
     * Each tick will check for new requests to pick up and update engine state for each of the elevators
     * @see INTERVAL_TICK
     */
    startEngine(): void {
        this.interval = setInterval(() => {
            if (this.control.hasRequests()) {
                this.checkRequests()
                this.updateState()
            }
        }, INTERVAL_TICK)
    }

    /**
     * Stops the engine, pretty much just stops the loop execution
     */
    stopEngine(): void {
        if (this.interval) {
            console.log('Stopping the engine...')
            clearInterval(this.interval)
        }
    }

    private onNewRequest(request: ElevatorRequest): void {
        const freeElevators = this.control.elevators.filter(e => !e.request)

        if (freeElevators.length) {
            // Need to find elevator for new request
            const found = this.findClosestElevator(freeElevators, request.start)
            found.request = request
            found.request.status = RequestStatus.PENDING
        }
    }

    private checkRequests(): void {
        const next = this.control.getNextRequest()
        if (next) this.onNewRequest(next)
    }

    private updateState(): void {
        // For each elevator that have requests
        this.control.elevators
            .filter(e => e.request)
            .forEach(e => {
                if (e.floor > this.control.floors) throw new Error('System error, elevator floor is our of range')

                // Elevator is trying to pick up the request
                if (e.request?.status === RequestStatus.PENDING) this.moveToRequest(e)

                // Elevator pick up the request and update status
                if (e.floor === e.request?.start) this.pickUpRequest(e)

                // With request, check if it can be fulfilled, if not move in a correct direction
                if (e.request?.status === RequestStatus.IN_PROGRESS) this.moveElevatorWithRequest(e)
            })
    }

    private moveToRequest(e: Elevator) {
        if (e.request) {
            e.floor = e.request.start > e.floor ? e.floor + 1 : e.floor - 1

            // Move elevator one step in needed direction
            console.log(`${e.name}: ${e.floor} -> ${e.request?.start} to pick up`)
        }
    }

    private pickUpRequest(e: Elevator) {

        if (e.request) {
            console.log(`${e.name} has picked up request to ${e.request?.desired}`)
            e.request.status = RequestStatus.IN_PROGRESS
            e.direction = e.request?.desired < e.floor ? Direction.DOWN : Direction.UP
        }
    }

    private moveElevatorWithRequest(e: Elevator) {
        // Elevator ready to fulfill the request
        if (e.floor === e.request?.desired) {
            console.log(`Request to floor ${e.request.desired} fulfilled by elevator ${e.name}`)
            this.control.removeRequest(e.request)
            e.request = undefined
        } else {
            // If current elevator floor is upper more than desired floor --
            e.floor = e.request?.direction === Direction.UP ? e.floor + 1 : e.floor - 1

            // Move elevator one step in needed direction
            console.log(`${e.name}: ${e.floor} -> ${e.request?.desired}`)
        }
    }

    private findClosestElevator(elevators: Elevator[], floor: number): Elevator {
        return elevators.reduce((prev, curr) => {
            return (Math.abs(curr.floor - floor) < Math.abs(prev.floor - floor) ? curr : prev)
        })
    }
}