import {Direction, Elevator} from './interfaces'
import {ControlPlane} from './control-plane'

(function runEngine() {

    const elevators = generateRandomElevators(3)

    const control = new ControlPlane(10, elevators)

    // Then user make a request from any of the floors, can be random
    // ElevatorRequest {floor: 10, direction: UP or DOWN}
    // Once this is done, engine should start and work in ticks
    // One tick is well, one floor for each elevator, assuming they are working the same
    // I'd like to skip speed here for now
    // Each tick engine will print it's state including where each elevator is
    // And how many requests are
    // Well and of course manage elevators directions and stuff

})()

function generateRandomElevators(amount: number): Elevator[] {
    return new Array(amount).fill(
        {
            floor: 0,
            direction: Direction.UP
        })
}