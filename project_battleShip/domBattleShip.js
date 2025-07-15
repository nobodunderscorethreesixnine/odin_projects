import { Ship } from "./ship.js";
import { Player } from "./player.js";

// variables
const gridSize = 10;
const playerCellMap = {};
const computerCellMap = {};

let currentTurn = "human";
// initialize Player
const humanPlayer = new Player("human", "human", gridSize);
const computerPlayer = new Player("computer", "AI", gridSize);

// dom query
const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");
const randomBtn = document.querySelector(".randomise-btn");
const winnerDisplay = document.querySelector("h1");

playerBoard.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
computerBoard.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;

let boardCols = gridSize;
let boardRows = gridSize;

function createGrid(container, cellMap) {
	for (let row = 0; row < boardRows; row++) {
		for (let col = 0; col < boardCols; col++) {
			const gridBox = document.createElement("div");
			gridBox.classList.add("cells");
			gridBox.dataset.row = row;
			gridBox.dataset.col = col;
			container.appendChild(gridBox);
			cellMap[`${row},${col}`] = gridBox;
		}
	}
}
createGrid(playerBoard, playerCellMap);
createGrid(computerBoard, computerCellMap);
computerBoard.style.pointerEvents = "none"; /* disabling btn at start*/
playerBoard.style.pointerEvents = "none"; /* disabling btn at start*/

// placing ship randomly
const directions = ["horizontal", "vertical"];
function getDefaultFleet() {
	return [new Ship(4), new Ship(3), new Ship(2), new Ship(1)];
}

function clearBoardVisual() {
	computerPlayer.previousAttack = [];
	computerPlayer.targetQueue = [];
	computerPlayer.mode = "hunt";

	winnerDisplay.textContent = "";
	humanPlayer.gameBoard.clearBoard();
	computerPlayer.gameBoard.clearBoard();
	Object.values(playerCellMap).forEach((cell) => {
		cell.classList.remove("miss-cells", "hit-cells", "ship-cells");
	});
	Object.values(computerCellMap).forEach((cell) => {
		cell.classList.remove("miss-cells", "hit-cells", "ship-cells");
	});
	currentTurn = "human";
	updateTurnDOM(currentTurn);
}

randomBtn.addEventListener("click", () => {
	computerBoard.style.pointerEvents = "auto";
	clearBoardVisual();
	humanPlayer.placeFleetRandomly(getDefaultFleet(), directions);
	renderShipDOM(playerCellMap, humanPlayer.gameBoard.getGrid());
	computerPlayer.placeFleetRandomly(getDefaultFleet(), directions);
	// renderShipDOM(computerCellMap, computerPlayer.gameBoard.getGrid()); //debugging purpose
});

function renderShipDOM(cellMap, grid, className = "ship-cells") {
	Object.values(cellMap).forEach((cell) => cell.classList.remove(className));

	grid.forEach((row, i) => {
		row.forEach((ship, j) => {
			if (ship != null) {
				const key = `${i},${j}`;
				cellMap[key].classList.add(className);
			}
		});
	});
}

function displayMiss(cellMap, row, col, className) {
	const key = `${row},${col}`;
	cellMap[key].classList.add(className);
}

function updateTurnDOM(currentTurn) {
	if (currentTurn === "computer") {
		playerBoard.style.border = "2px solid red";
		computerBoard.style.border = "none";
	} else {
		computerBoard.style.border = "2px solid red";
		playerBoard.style.border = "none";
	}
}

function renderAttack(player, cellMap, row, col) {
	const result = player.gameBoard.receiveAttack(row, col);
	if (result === "already-hit" || result === "already-miss") {
		return;
	} else if (result === "miss") {
		displayMiss(cellMap, row, col, "miss-cells");
		currentTurn = currentTurn === "human" ? "computer" : "human";
		updateTurnDOM(currentTurn);
	} else {
		displayMiss(cellMap, row, col, "hit-cells");
		return "hit";
	}
}

/* normal computer attack func (no-smart) */
// function computerAttack() {
// 	const [attackCoordinateX, attackCoordinateY] = computerPlayer.generateRandomAttackCoordinates()
// 	let attack = renderAttack(humanPlayer,playerCellMap,attackCoordinateX,attackCoordinateY)
// 	while (attack == 'hit') {
// 		const [attackCoordinateX, attackCoordinateY] = computerPlayer.generateRandomAttackCoordinates()
// 		attack = renderAttack(humanPlayer,playerCellMap,attackCoordinateX,attackCoordinateY)
// 	}
// } 

function computerAttack() {
	const [x, y] = computerPlayer.generateSmartAttackCoordinates();
	const result = renderAttack(humanPlayer, playerCellMap, x, y);

	computerPlayer.previousAttack.push([x, y]);

	if (result === "hit") {
		computerPlayer.enqueueAdjacentCoordinates(x, y);
		computerPlayer.mode = "target";
		setTimeout(() => computerAttack(), 500);
	} else {
		if (computerPlayer.targetQueue.length === 0) {
			computerPlayer.mode = "hunt";
		}
		currentTurn = "human";
		updateTurnDOM(currentTurn);
	}
}

computerBoard.addEventListener("click", (e) => {
	if (currentTurn !== "human") return;
	const attackedCell = e.target;
	let row = Number(attackedCell.dataset.row);
	let col = Number(attackedCell.dataset.col);
	const prevTurn = currentTurn;
	renderAttack(computerPlayer, computerCellMap, row, col);
	displayWinner();
	if (currentTurn == "computer" && prevTurn == "human") {
		setTimeout(() => {
			computerAttack();
			displayWinner();
		}, 1000);
	}
});

function displayWinner() {
	if (computerPlayer.gameBoard.allShipsSunk()) {
		winnerDisplay.textContent = "Player wins";
		disableBtn();
	}
	if (humanPlayer.gameBoard.allShipsSunk()) {
		winnerDisplay.textContent = "Computer wins";
		disableBtn();
	}
}

function disableBtn() {
	computerBoard.style.pointerEvents = "none";
	playerBoard.style.pointerEvents = 'none';
}