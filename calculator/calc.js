const input_box = document.querySelector("#input-box");
const decimal_btn = document.querySelector(".decimal-point");
const optr_btns = document.querySelectorAll('.calc-optr')

let first_number = null;
let operator = null;
let second_number = null;
let user_input = "";

function display_input(input) {
	input_box.value = input;
}

function update_variable() {
	if (first_number != null && operator != null) {
		second_number = user_input;
	} else {
		first_number = user_input;
	}
}

function zero_division_error() {
	alert("congratulations successful person");
	window.location.reload();
}

function calc_nmbr_handler(btn) {
	user_input += btn.textContent;
	display_input(user_input);
	update_variable();

	console.log("first_number", first_number);
	console.log("operator", operator);
	console.log("second_number", second_number);
}

function calc_optr_handler(btn) {
	user_input = "";
    remove_background()
    btn.classList.toggle('background')
	if (operator != null && first_number != null && second_number != null) {
		if (operator == "/" && second_number == 0) {
			zero_division_error();
		} else {
			let answer = math_operations(first_number, operator, second_number);
			first_number = answer;
			display_input(answer);
		}
	}
	operator = btn.textContent;
}

function math_operations(first_number, operator, second_number) {
	first_number = parseFloat(first_number);
	second_number = parseFloat(second_number);
	if (operator == "+") {
		return first_number + second_number;
	} else if (operator == "-") {
		return first_number - second_number;
	} else if (operator == "*") {
		return first_number * second_number;
	} else if (operator == "/") {
		return first_number / second_number;
	} else if (operator == "%") {
		return (first_number * second_number) / 100;
	}
}

function clear_screen(btn) {
	first_number = null;
	operator = null;
	second_number = null;
	user_input = "";
	display_input(user_input);
	decimal_btn.disabled = false;
    remove_background()
}

function backspace() {
	const screen_number = input_box.value;
	if (screen_number.length == 0) {
		return;
	}
	screen_number.includes(".") ? (decimal_btn.disabled = false) : "";
	const updated_screen_number = screen_number.slice(0, -1);
	display_input(updated_screen_number);
	user_input = updated_screen_number;
	if (operator == null) {
		first_number = user_input;
	} else {
		second_number = user_input;
	}
}

function total() {
    remove_background()
	if (operator == "/" && second_number == 0) {
		zero_division_error();
	} else if (first_number != null && second_number != null && operator != null) {
		const total_answer = math_operations(first_number, operator, second_number);
		display_input(total_answer);
		first_number = total_answer;
		second_number = null;
	}
}

decimal_btn.addEventListener("click", () => {
	let x = user_input;
	console.log(x, "this is value");
	if (x.includes(".")) {
		decimal_btn.disabled = true;
	} else {
		decimal_btn.disabled = false;
		console.log("decimal point is clicked and work");
		user_input += decimal_btn.textContent;
		display_input(user_input);
	}
});

function remove_background(){
    optr_btns.forEach((btn) => {
		if (btn.classList.contains('background')) { /* background class is in css file */
			btn.classList.toggle('background');
		}
	});
}

const calc_btns = document.querySelector(".calc-buttons");
calc_btns.addEventListener("click", ({ target: btn }) => {
	//{target:btn} => destructuring and assigning new variable btn, instead of writing e.target
	if (btn.classList.contains("calc-nmbr")) {
		calc_nmbr_handler(btn);
	} else if (btn.classList.contains("calc-optr")) {
		calc_optr_handler(btn);
	} else if (btn.classList.contains("calc-clear-btn")) {
		clear_screen();
	} else if (btn.classList.contains("calc-delete-btn")) {
		backspace();
	} else if (btn.classList.contains("calc-equal-btn")) {
		total();
	}
});