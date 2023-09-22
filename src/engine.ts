import {ControlPlane} from './control-plane.js'
import {Direction, Elevator, ElevatorRequest, RequestStatus} from './interfaces.js'

const INTERVAL_TICK = 1000

export class ElevatorEngine {

    private readonly control: ControlPlane

    constructor(control: ControlPlane) {
        this.control = control
    }

    // Turn off and on the engine using control plane
    startEngine() {
        let retryTime = 0
        const interval = setInterval(() => {
            if (this.control.hasRequests()) {
                this.checkRequests()
                this.updateState()
            } else {
                if (retryTime >= 10) interval.unref()

                console.log('No active requests in the system')
                retryTime += 1
            }
        }, INTERVAL_TICK)
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
        if (this.control.hasRequests()) {
            const next = this.control.getNextRequest();
            if (next) this.onNewRequest(next)
        }
    }

    private updateState(): void {
        // For each elevator that have requests
        this.control.elevators
            .filter(e => e.request)
            .forEach(e => {

                if (e.request?.status === RequestStatus.PENDING) {
                    e.floor = e.request.start > e.floor ? e.floor + 1 : e.floor - 1

                    // Move elevator one step in needed direction
                    console.log(`${e.name} is on ${e.floor} floor and going ${e.request?.start} to pick up`)
                }

                // Elevator picked up the request and updated status
                if (e.floor === e.request?.start) {
                    console.log(`${e.name} has picked up request to ${e.request.desired}`)
                    e.request.status = RequestStatus.IN_PROGRESS
                    e.direction = e.request?.desired < e.floor ? Direction.DOWN : Direction.UP
                }

                if (e.request?.status === RequestStatus.IN_PROGRESS) {

                    // Elevator ready to fulfill the request
                    if (e.floor === e.request.desired) {
                        console.log(`Request to floor ${e.request.desired} fulfilled by elevator ${e.name}`)
                        this.control.removeRequest(e.request)
                        e.request = undefined
                    } else {
                        // If current elevator floor is upper more than desired floor --
                        e.floor = e.request?.direction === Direction.UP ? e.floor + 1 : e.floor - 1

                        // Move elevator one step in needed direction
                        console.log(`${e.name} is on ${e.floor} floor and moving to ${e.request?.desired}`)
                    }
                }
            })
    }

    private findClosestElevator(elevators: Elevator[], floor: number): Elevator {

        return elevators.reduce(function (prev, curr) {
            return (Math.abs(curr.floor - floor) < Math.abs(prev.floor - floor) ? curr : prev)
        })
    }
}