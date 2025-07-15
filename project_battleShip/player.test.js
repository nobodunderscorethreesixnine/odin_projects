import { Player } from "./player.js";
import { Ship } from "./ship.js";

let humanPlayer;
let computerPlayer;
let gameBoardGridSize = 4; /* note- don't increase gridSize cause it may slows down the test, lesser the gridSize more fast the test*/
let battleShip;
beforeEach(() => {
    battleShip = new Ship(2);
	humanPlayer = new Player("Adam", "human", gameBoardGridSize);
	computerPlayer = new Player("AI", "computer", gameBoardGridSize);
});

describe('Checking initialization of humanPlayers', () => {
	let gameBoardGridSize = 5;
	let man = new Player("ramey", "human", gameBoardGridSize);
	test("Test for humanPlayer attribute", () => {
		expect(man.getPlayerName()).toBe("ramey");
		expect(man.getPlayerType()).toBe("human");
	});

	test("Test game board humanPlayer", () => {
		expect(man.gameBoard.getGridSize()).toBe(5);
	});
});

describe('Checking initialization of computerPlayers',()=>{
    let gameBoardGridSize = 4
    let terminator = new Player('Robot','computer',gameBoardGridSize);
    test('Test for computer player attribute',()=>{
        expect(terminator.getPlayerName()).toBe('Robot')
        expect(terminator.getPlayerType()).toBe('computer')
    })

    test('Test game board of computer',()=>{
        expect(terminator.gameBoard.getGridSize()).toBe(4);
    })
})


describe('Checking generateRandomAttackCoordinates() - methods', ()=>{
	test('Test if gridSize is within range', ()=>{
		const testCount = 4;
		 /* using for loop make sure that coordinates are within range,like checking multiple times (manually) */
		for (let test = 0;test<testCount;test++) {
			const [x,y] = computerPlayer.generateRandomAttackCoordinates()
			expect(x).toBeGreaterThanOrEqual(0)
			expect(x).toBeLessThan(gameBoardGridSize)
			expect(y).toBeGreaterThanOrEqual(0)
			expect(y).toBeLessThan(gameBoardGridSize)
		}
	})

	test('Test for duplicate coordinates', ()=>{
		const possibleCoordinates = gameBoardGridSize * gameBoardGridSize;
		let loopCount = 0
		const coordinates = new Set();
		while (loopCount++ < possibleCoordinates) {
			const [x,y] =computerPlayer.generateRandomAttackCoordinates();
			coordinates.add(`${x},${y}`)
		}
		expect(possibleCoordinates).toBe(coordinates.size)
	})
})