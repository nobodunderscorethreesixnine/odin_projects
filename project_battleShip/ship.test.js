import {Ship} from './ship'

let battleShip;

beforeEach(()=>{
    battleShip = new Ship(4);
})


test('checking length of the ship', ()=>{
    expect(battleShip.length).toEqual(4)
})

test('checking method hit() by increasing value by 1', ()=>{
    battleShip.hit()
    expect(battleShip.getHit()).toEqual(1)
}) 

test('checking method getHit()', ()=>{
    battleShip.hit()
    battleShip.hit()
    expect(battleShip.getHit()).toEqual(2)
})

test('checking method isSunk(), if ship has been hit enough times', ()=>{
    battleShip.hit()
    battleShip.hit()
    battleShip.hit()
    battleShip.hit()
    expect(battleShip.isSunk()).toBe(true)
    
})

test('checking method isSunk(), if ship has not been hit enough times', ()=>{
    battleShip.hit()
    expect(battleShip.isSunk()).toBe(false)
})