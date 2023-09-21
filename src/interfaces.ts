export interface Elevator {
    floor: number,
    direction: Direction,
    weight: number,
    enabled: boolean
}

export enum Direction {
    UP,
    DOWN
}

export interface ElevatorRequest {
    floor: number,
    direction: Direction
}