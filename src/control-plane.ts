import {Elevator, ElevatorRequest, RequestStatus} from './interfaces.js'
import {ElevatorEngine} from './engine.js'

/**
 * Control plane object
 * Stores all requested and pending elevators requests
 * Elevators itself and the engine for convenience
 */
export class ControlPlane {

    public readonly floors: number
    public readonly elevators: Elevator[]
    private _queue: ElevatorRequest[] = []
    private readonly engine: ElevatorEngine

    constructor(floors: number, elevators: Elevator[]) {
        this.floors = floors
        this.elevators = elevators
        this.engine = new ElevatorEngine(this)
    }

    hasRequests(): boolean {
        return this._queue.length > 0
    }

    addRequest(request: ElevatorRequest): void {
        this._queue.push(request)
    }

    removeRequest(request: ElevatorRequest): ElevatorRequest[] {
        const index = this._queue.indexOf(request)

        if (index === -1) throw new Error('Request is not found')

        return this._queue.splice(index, 1)
    }

    getNextRequest(): ElevatorRequest | undefined {
        return this._queue.find(e => e.status === RequestStatus.INIT)
    }

    startEngine(): void {
        this.engine.startEngine()
    }

    stopEngine(): void {
        this.engine.stopEngine()
    }
}