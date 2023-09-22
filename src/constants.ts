import * as process from 'process'

export const BUILDING_FLOORS = 10
export const INTERVAL_TICK = parseInt(process.env.INTERVAL_TICK || '1000')
export const REQUESTS_AMOUNT = parseInt(process.env.REQUESTS_AMOUNT  || '20')
export const ELEVATORS_AMOUNT = parseInt(process.env.ELEVATORS_AMOUNT || '2')