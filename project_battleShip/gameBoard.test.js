import {GameBoard} from './gameBoard.js'
import {Ship} from './ship.js'

let board;
let battleShip;
beforeEach(()=>{
    board = new GameBoard(3)
    battleShip = new Ship(2)
})

test('prevent placing shipo with negative coordinates',()=>{
    expect(board.hasNegativeCoordinate(-1,0)).toBe(true)
})

describe('Checking isValidShipPlacement() - methods', ()=>{
    
    test('out of bounds checks for ship placed vertically & horizontally',()=>{
        const bigShip = new Ship(4)
        expect(board.isValidShipPlacement(bigShip, 0,0,'horizontal')).toBe(false);
        expect(board.isValidShipPlacement(bigShip, 0,0,'vertical')).toBe(false);
    })

    test('test for collision of ship placed vertically & horizontally', ()=>{
        board.placeShips(battleShip,2,0,'vertical')
        expect(board.isValidShipPlacement(battleShip,2,0,'vertical')).toBe(false)

        board.placeShips(battleShip,0,0,'horizontal')
        expect(board.isValidShipPlacement(battleShip,0,0,'horizontal')).toBe(false)
    })
})

describe('Checking placeShips() - methods', ()=>{
    test('place ship correclty on valid coordinates (horizontally)', ()=>{
        board.placeShips(battleShip,0,0,'horizontal');
        expect(board.getGrid()[0][0]).toBe(battleShip)
        expect(board.getGrid()[1][0]).toBe(battleShip)
    })

    test('place ship correctly on valid coordinates (vertically)',()=>{
        board.placeShips(battleShip,1,1,'vertical')
        expect(board.getGrid()[1][1]).toBe(battleShip)
        expect(board.getGrid()[1][2]).toBe(battleShip)
    })

    test('test out of bounds for vertically place ship', ()=>{
        board.placeShips(battleShip,2,2,'vertical')
        expect(board.getGrid()[2][2]).toBe(null);
    })

    test('test out of bounds for horizontally palce ship', ()=>{
        board.placeShips(battleShip,2,0,'horizontal')
        expect(board.getGrid()[2][2]).toBe(null);
    })

    test('test collision for horizontally place ship', ()=>{
        board.placeShips(battleShip,1,1,'horizontal')
        expect(board.placeShips(battleShip,1,1,'horizontal')).toBe(false)
    })

    test('test collision for vertically place ship', ()=>{
        board.placeShips(battleShip,0,0,'vertical')
        expect(board.placeShips(battleShip,0,0,'vertical')).toBe(false)
    })

})

describe('Checking receiveAttack() - methods', ()=>{
    test('test hit on ship', ()=>{
        board.placeShips(battleShip,0,0,'vertical')
        expect(board.receiveAttack(0,0)).toBe('hit')
        expect(board.receiveAttack(0,1)).toBe('hit')
        expect(battleShip.getHit()).toBe(2)
    })

    test('test ship does not get hit', ()=>{
        board.placeShips(battleShip,0,0,'horizontal')
        expect(board.receiveAttack(0,1)).toBe('miss')
    })

    test('test duplicate hit', ()=>{
        board.placeShips(battleShip,0,0,'vertical')
        board.receiveAttack(0,0)
        expect(board.receiveAttack(0,0)).toBe('already-hit');
    })

    test('test duplicate miss',()=>{
        board.placeShips(battleShip,0,0,'vertical')
        board.receiveAttack(1,1)
        expect(board.receiveAttack(1,1)).toBe('already-miss')
    })
})

describe('Checking allShipSunk() - methods',()=>{    
    test('test if ships sunked ', ()=>{
        board.placeShips(battleShip,0,0,'horizontal')
        board.receiveAttack(0,0)
        board.receiveAttack(1,0)
        expect(board.allShipsSunk()).toBe(true)
    })

    test('test if ships did not sunk', ()=>{
        board.placeShips(battleShip,0,0,'vertical')
        board.receiveAttack(0,0)
        expect(board.allShipsSunk()).toBe(false);
    })
})