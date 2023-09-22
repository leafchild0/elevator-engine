import 'dotenv/config'
import {Direction, Elevator, RequestStatus} from './interfaces.js'
import {ControlPlane} from './control-plane.js'
import {BUILDING_FLOORS, ELEVATORS_AMOUNT, REQUESTS_AMOUNT} from './constants.js'

/**
 * Main function to run the engine using Control pane
 * Pretty much generates random elevators and requests for the sake of demo
 */
function runEngine() {

    const elevators = generateRandomElevators(ELEVATORS_AMOUNT)

    const control = new ControlPlane(BUILDING_FLOORS, elevators)

    control.startEngine();

    // Let's generate some requests
    for (let i = 1; i < REQUESTS_AMOUNT; i++) {
        control.addRequest({
            start: i,
            desired: BUILDING_FLOORS - i,
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