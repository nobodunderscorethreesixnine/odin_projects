function GameBoard(players) {
	// const { p1: player1, p2: player2, p1Wpn: player1Wpn, p2Wpn: player2Wpn } = players /* 
	// can also use destructuring methods to declare variables */
	let gameBoard = ["", "", "", "", "", "", "", "", ""];
	const player1 = players.p1;
	const player1Wpn = players.p1Wpn;
	const player2 = players.p2
	const player2Wpn = players.p2Wpn;
	// let currentPlayer;/* choosing player randomly */
	let currentPlayer = randomPlayerChooser();
	// let currentWeapon;/* choosing weapon acc to currentPlayer */
	let currentWeapon = determineWeapon(currentPlayer)
	let p1Points = 0;
	let p2Points = 0;

	// querying dom
	const clck_btn = document.querySelectorAll("#box");
	const winner = document.querySelector('#display-winner')
	const playerTurns = document.querySelector('#player-turns')
	const player1Points = document.querySelector('#player-1-points')
	const player2Points = document.querySelector('#player-2-points')
	const winningPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8] /* rows */,

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8] /* columns */,

		[0, 4, 8],
		[6, 4, 2] /* diagonals */,
	];

	// randomPlayerChooser();
	function randomPlayerChooser() {
		// this function randomly selects user's
		const playersList = [player1, player2]
		const randomPlayer = playersList[Math.floor(Math.random() * 2)];
		return randomPlayer;
	}

	function determineWeapon(player) {
		/*   this function choose weapon based on return from randomPlayerChooser() -> while user can choose weapon before
		 starting game , we need to make sure that the weapon matches the user selection*/
		return player == player1 ? player1Wpn : player2Wpn;
	}

	const getCurrentPlayer = () => currentPlayer;
	const getCurrentWeapon = () => currentWeapon;
	const updateCurrentPlayerAndWeapon = () => {
		currentPlayer = (currentPlayer == player1) ? player2 : player1,
			currentWeapon = (currentWeapon == player1Wpn) ? player2Wpn : player1Wpn
	}

	function updatePlayerTurnsGUI() {
		playerTurns.textContent = `${currentPlayer == player1 ? player2 : player1} turns`
	}
	updatePlayerTurnsGUI() /* running so player can see tuns while starting game
	 */

	// iife
	const setGUIName = (function () {
		const p1GUIName = document.querySelector('#player-name-1');
		const p2GUIName = document.querySelector('#player-name-2');
		p1GUIName.textContent = `${player1}:`;
		p2GUIName.textContent = `${player2}:`;
	})();

	function gameFlow() {
		getUserInput();
	}

	function gameChecker() {
		let iswinnerFound = false;
		winningPatterns.forEach((ptrn, indx) => {
			let [ptrn1, ptrn2, ptrn3] = ptrn;
			if (gameBoard[ptrn1] && gameBoard[ptrn2] && gameBoard[ptrn3]) {
				if (gameBoard[ptrn1] === gameBoard[ptrn2] && gameBoard[ptrn2] === gameBoard[ptrn3]) {
					const winnerPlayer = getCurrentPlayer();
					displayResult(`${winnerPlayer} wins`)
					udpatePointsGUI(winnerPlayer)
					iswinnerFound = true;
				}
				else if (!iswinnerFound) {
					drawChecker()
				}
			}
		});
	}

	function resetBoard() {
		winner.style.visibility = 'hidden'
		playerTurns.style.visibility = 'visible';
		gameBoard = ["", "", "", "", "", "", "", "", ""];
		clck_btn.forEach((btn) => {
			btn.textContent = ''
			btn.disabled = false;
		})
	}

	function udpatePointsGUI(winningPlayer) {
		if (winningPlayer == player1) {
			p1Points += 1
			player1Points.textContent = p1Points;
		}
		else {
			p2Points += 1
			player2Points.textContent = p2Points;
		}
	}

	function displayResult(result = 'Draw') {
		playerTurns.style.visibility = 'hidden'
		winner.textContent = result;
		winner.style.visibility = 'visible'
		// disabiling buttons
		clck_btn.forEach((button) => {
			button.disabled = true;
		})
		setTimeout(resetBoard, 1000)
	}

	function drawChecker() {
		let gameBoardLength = gameBoard.filter((cell => cell == '')).length
		gameBoardLength == 0 ? displayResult('Draw') : ''
	}

	function getUserInput() {
		clck_btn.forEach((btn, indx) => {
			btn.addEventListener("click", () => {
				updateGUIBoard(btn, indx);
				updatePlayerTurnsGUI()
				gameChecker();
			});
		});
	}

	function updateGUIBoard(btn, indx) {
		if (!btn.textContent) {
			updateCurrentPlayerAndWeapon();
			const crntWpn = getCurrentWeapon();
			gameBoard[indx] = crntWpn;
			btn.textContent = crntWpn;
		}
	}

	return { gameFlow };
}

function startGame() {
	const submitBtn = document.querySelector(".submit-btn");
	const layer = document.querySelector(".layer");
	const player1 = document.querySelector("#player1");
	const player2 = document.querySelector("#player2");
	const showError = document.querySelector("#show-error");
	// querying player/s wpn
	const player1Weapon = document.querySelector('#player-1-wpn');
	const player2Weapon = document.querySelector('#player-2-wpn');
	// qurying weapon btn
	const tglWpns = document.querySelector('.tgl-wpn');

	function start() {
		tglWpns.addEventListener('click', () => {
			player1Weapon.textContent == 'X' ?
				(player2Weapon.textContent = 'X', player1Weapon.textContent = 'O') :
				(player1Weapon.textContent = 'X', player2Weapon.textContent = 'O')
		})

		let timeoutID;
		submitBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (player1.value.length != 0 && player2.value.length != 0) {
				layer.style.display = `none`;
				const player1Name = player1.value;
				const player2Name = player2.value;
				const player1Wpn = player1Weapon.textContent;
				const player2Wpn = player2Weapon.textContent;
				const play = GameBoard({ p1: player1Name, p2: player2Name, p1Wpn: player1Wpn, p2Wpn: player2Wpn });
				play.gameFlow();
			} else {
				showError.style.visibility = "visible";
				showError.textContent = "Please Enter Your Name";

				timeoutID ? clearInterval(timeoutID) : "";
				timeoutID = setTimeout(() => {
					showError.style.visibility = "hidden";
				}, 3000);
			}
		});
	}

	const resetBtn = document.querySelector('#reset-btn')
	resetBtn.addEventListener('click', () => {
		window.location.reload();
		/* so even if i did reload with above code, in some browser(firefox-developer-edition) it won't be removed so again
		making it null */
		player1.value = ''
		player2.value = ''
	})

	return {
		start,
	};
}

const play = startGame();
play.start();