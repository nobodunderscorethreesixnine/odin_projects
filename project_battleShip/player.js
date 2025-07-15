import { GameBoard } from "./gameBoard.js";

class Player {
	constructor(name, playerType, gameBoardGridSize) {
		this.gameBoard = new GameBoard(gameBoardGridSize);
		this.name = name;
		this.playerType = playerType;
		this.isTurn = this.name;
		this.previousAttack = [];
		this.gameBoardGridSize = gameBoardGridSize;
		this.targetQueue = [];
		this.mode = "hunt";
	}
	getPlayerType() {
		return this.playerType;
	}
	getPlayerName() {
		return this.name;
	}
	getCurrentPlayer() {
		return this.isTurn;
	}
	getPreviousAttack() {
		return this.previousAttack;
	}

	attackShip(enemy, xPos, yPos) {
		return enemy.gameBoard.receiveAttack(xPos, yPos);
	}

	generateSmartAttackCoordinates() {
		if (this.mode === "target" && this.targetQueue.length > 0) {
			return this.targetQueue.shift();
		} else {
			this.mode = "hunt";
			return this.generateRandomAttackCoordinates();
		}
	}

	enqueueAdjacentCoordinates(x, y) {
		const directions = [
			[x + 1, y],
			[x - 1, y],
			[x, y + 1],
			[x, y - 1],
		];
		directions.forEach(([newX, newY]) => {
			const isValid =
				newX >= 0 &&
				newY >= 0 &&
				newX < this.gameBoardGridSize &&
				newY < this.gameBoardGridSize &&
				!this.previousAttack.some(
					([px, py]) => px === newX && py === newY
				);
			if (isValid) this.targetQueue.push([newX, newY]);
		});
	}

	// generateRandomAttackCoordinates() {
	// 	const totalCoordinates =
	// 		this.gameBoardGridSize * this.gameBoardGridSize;
	// 	while (this.previousAttack.length < totalCoordinates) {
	// 		const randomXpos = Math.floor(
	// 			Math.random() * this.gameBoardGridSize
	// 		);
	// 		const randomYpos = Math.floor(
	// 			Math.random() * this.gameBoardGridSize
	// 		);
	// 		const isDuplicate = ([x, y]) =>
	// 			x === randomXpos && y === randomYpos;
	// 		if (this.previousAttack.some(isDuplicate)) {
	// 			continue;
	// 		} else {
	// 			this.previousAttack.push([randomXpos, randomYpos]);
	// 			return [randomXpos, randomYpos];
	// 		}
	// 	}
	// 	return [-1, -1];
	// } 

	generateRandomAttackCoordinates() {
		const totalCoordinates =
			this.gameBoardGridSize * this.gameBoardGridSize;

		for (let i = 0; i < totalCoordinates * 2; i++) {
			// * 2 = Retry buffer
			const randomXpos = Math.floor(
				Math.random() * this.gameBoardGridSize
			);
			const randomYpos = Math.floor(
				Math.random() * this.gameBoardGridSize
			);

			const isDuplicate = ([x, y]) =>
				x === randomXpos && y === randomYpos;
			if (!this.previousAttack.some(isDuplicate)) {
				this.previousAttack.push([randomXpos, randomYpos]);
				return [randomXpos, randomYpos];
			}
		}
		return null; 
	}

	placeFleetRandomly(fleet, directions) {
		fleet.forEach((ship) => {
			while (true) {
				const randomXpos = Math.floor(
					Math.random() * this.gameBoardGridSize
				);
				const randomYpos = Math.floor(
					Math.random() * this.gameBoardGridSize
				);
				const direction = directions[Math.floor(Math.random() * 2)];
				if (
					this.gameBoard.isValidShipPlacement(
						ship,
						randomXpos,
						randomYpos,
						direction
					)
				) {
					this.gameBoard.placeShips(
						ship,
						randomXpos,
						randomYpos,
						direction
					);
					break;
				}
			}
		});
	}
}
export { Player };
