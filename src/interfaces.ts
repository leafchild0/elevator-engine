export interface Elevator {
    name: string,
    floor: number,
    direction: Direction,
    // If there is a request elevator is trying to fulfill
    request?: ElevatorRequest
    // Should probably be added later to decide which elevator
    // will come if other conditions are the same
    //weight: number,
    // Will be added in the next versions for simplicity
    //enabled: boolean
}

export enum Direction {
    UP = 'Up',
    DOWN = 'Down'
}

export enum RequestStatus {
    INIT= 'Init',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress'
}

export interface ElevatorRequest {
    desired: number,
    start: number,
    direction: Direction,
    status: RequestStatus
}