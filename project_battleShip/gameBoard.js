class GameBoard {
	constructor(gridSize = 3) {
		this.gridSize = gridSize;
		this.grid = Array(gridSize)
			.fill(null)
			.map(() => Array(gridSize).fill(null));
		this.missedShots = [];
		this.hitShots = [];
		this.ships = [];
	}

	getGridSize() {
		return this.gridSize;
	}

	getShips() {
		return this.ships;
	}
	getGrid() {
		return this.grid;
	}
	hasNegativeCoordinate(x, y) {
		if (x < 0 || y < 0) return true;
		/* this check is kinda optional cause, negative value logic is controlled by GUI
		cause user will click grid that are from 0 to specific number,But doing TTD, it forces us to think
		what causes our test to fail, so i have included this method */
	}

	clearBoard() {
		this.grid = Array.from({length:this.gridSize},()=>
			Array(this.gridSize).fill(null)
		);
		this.hitShots = []
		this.missedShots = []
		this.ships = []
	}

	isValidShipPlacement(ship, x, y, direction) {
		if (this.hasNegativeCoordinate(x, y)) return false;

		if (direction === "horizontal" && x + ship.length > this.gridSize)
			return false;
		if (direction === "vertical" && y + ship.length > this.gridSize)
			return false;
		for (let i = 0; i < ship.length; i++) {
			if (direction === "horizontal" && this.grid[x + i][y] !== null)
				return false;
			if (direction === "vertical" && this.grid[x][y + i] !== null)
				return false;
		}
		return true;
	}

	placeShips(ship, x, y, direction) {
		if (!this.isValidShipPlacement(ship, x, y, direction)) {
			return false;
		}

		for (let i = 0; i < ship.length; i++) {
			if (direction === "horizontal") {
				this.grid[x + i][y] = ship;
			} else if (direction === "vertical") {
				this.grid[x][y + i] = ship;
			}
		}
		this.ships.push(ship);
		return true;
	}

	receiveAttack(xPos, yPos) {
		const isAlreadyMissed = this.missedShots.some(
			([x, y]) => xPos === x && yPos === y
		);
		if (isAlreadyMissed) return 'already-miss';
		const isAlreadyHit = this.hitShots.some(
			([x, y]) => xPos === x && yPos === y
		);
		if (isAlreadyHit) return 'already-hit';

		if (this.grid[xPos][yPos] !== null) {
			const ship = this.grid[xPos][yPos];
			ship.hit();
			this.hitShots.push([xPos, yPos]);
			return 'hit';
		} else {
			this.missedShots.push([xPos, yPos]);
			return 'miss';
		}
	}

	allShipsSunk() {
		for (const ship of this.ships) {
			if (!ship.isSunk()) {
				return false;
			}
		}
		return true;
	}
}

export { GameBoard };