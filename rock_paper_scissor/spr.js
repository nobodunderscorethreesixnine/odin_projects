// point tracker in dom
let user_score = document.querySelector("#user-score");
let computer_score = document.querySelector("#computer-score");
// point tracker
let user_point = 0;
let computer_point = 0;

// computer_choice func
const computer_weapon_img = document.querySelector(".computer-img");
function computer_choice() {
	const computer_option = ["rock", "paper", "scissor"];
	const computer_choice_weapon = computer_option[Math.floor(Math.random() * 3)];
	computer_weapon_img.src = `images/player_2_${computer_choice_weapon}.png`;
	return computer_choice_weapon;
}

// winner_display func to display winner and who score the point
const winner_display = document.querySelector("#winner-display");
function display_winner(winner_name) {
	winner_display.textContent = `${winner_name} win`;
}

// five round winner display who win the round at the end
function five_round_winner_display() {
	if (user_point > computer_point) {
		winner_display.textContent = `user won by ${user_point} points`;
	} else if (computer_point > user_point) {
		winner_display.textContent = `computer won by ${computer_point} points`;
	} else {
		winner_display.textContent = "Draw";
	}
}

//  game_logic func it will check who win and change the score accordingly
const game_round = document.querySelector("#game-round");
function game_logic(user_choice, computer_choice) {
	if ((user_choice == "rock" && computer_choice == "scissor") || (user_choice == "paper" && computer_choice == "rock") || (user_choice == "scissor" && computer_choice == "paper")) {
		user_point += 1;
		user_score.textContent = user_point;
		display_winner("user");
	} else if ((computer_choice == "rock" && user_choice == "scissor") || (computer_choice == "paper" && user_choice == "rock") || (computer_choice == "scissor" && user_choice == "paper")) {
		computer_point += 1;
		computer_score.textContent = computer_point;
		display_winner("computer");
	} else {
		winner_display.textContent = "Draw";
	}
}

// game func run the most of the above function
const play_again_btn = document.querySelector("#play-again");
let game_life = 5;
function game(user_choice) {
	const user_weapon = user_choice;
	// console.log(user_weapon);
	const computer_weapon = computer_choice();
	game_logic(user_weapon, computer_weapon);
	game_life -= 1;
	game_round.textContent = game_life;
	console.log(game_life);
	// restarting game
	if (game_life == 0) {
		usr_buttons.forEach((button) => {
			button.disabled = true;
		});
		five_round_winner_display();

		play_again_btn.style.cssText = "display:inline";
		play_again_btn.addEventListener("click", () => {
			location.reload();
		});
	}
}

// usr_button func * this below code keep track if use click the button or not
const usr_buttons = document.querySelectorAll("#user-buttons");
const player_weapon_img = document.querySelector(".player-img");
usr_buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const clicked_button = button.textContent.toLowerCase();
		player_weapon_img.src = `images/player_1_${clicked_button}.png`;
		game(clicked_button);
	});
});
