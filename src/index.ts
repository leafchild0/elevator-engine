import {Direction, Elevator, RequestStatus} from './interfaces.js'
import {ControlPlane} from './control-plane.js'

const floors = 10

/**
 * Main function to run the engine using Control pane
 * Pretty much generates random elevators and requests for the sake of demo
 */
function runEngine() {

    const elevators = generateRandomElevators(2)

    const control = new ControlPlane(floors, elevators)

    control.startEngine();

    // Let's generate some requests
    for (let i = 1; i < 20; i++) {
        control.addRequest({
            start: i,
            desired: floors - i,
            direction: Direction.UP,
            status: RequestStatus.INIT
        })
    }
}

function generateRandomElevators(amount: number): Elevator[] {
    const elevators: Elevator[] = [];
    for (let i = 0; i < amount; i++) {
        elevators.push({
            name: 'Elevator ' + i,
            floor: i,
            direction: Direction.UP
        })
    }

    return elevators
}

runEngine()