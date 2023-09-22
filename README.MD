## Elevator engine

Small app engine that allows to play around elevators and requests.
Pretty much mimics real elevator system. Written in TS and Node, because this is easy.
Not a production ready, as I just wanted to apply some OOP and solve task of multiple elevators in one place

### How it works

Can specify amount of elevators and requests to them from start, then look into logs to see the results.
Using Control Plane to manage elevators and requests and engine which actually work on event loop principle. 
This loop will check for new requests and update state of each elevator

### How to run

Simply run `pnpm i` in the root folder to install all deps, which are basically just TS and types for node.
Then run compile it using `pnpm run compile`, finally run it using `pnpm run run`.
Alternatively, you can run `pnpm run watch` to run typescript watch for development.