const sketch_pad = document.querySelector(".sketch-pad");
const sketch_pad_width = 780;
const sketch_pad_height = 780;
// setting sketch_pad widht and height
sketch_pad.style.width = `${sketch_pad_width}px`;
sketch_pad.style.height = `${sketch_pad_height}px`;

let grid_rows = 16;
let grid_cols = 16;

const set_grid = document.querySelector("#btn");
set_grid.addEventListener("click", () => {
	const user_input = parseInt(prompt("Enter number between 1 to 100"));
	if (user_input >= 1 && user_input <= 100) {
		grid_rows = user_input;
		grid_cols = user_input;

		sketch_pad.innerHTML = ""; /* removing child element from previous  */
		create_grid(grid_rows, grid_cols);
	} else {
		alert("Please enter number between 1 to 100");
	}
});

const grid_size = document.querySelector("#grid-size"); /* display grid dimension to user */
function display_grid_dimension(grid_rows, grid_cols) {
	grid_size.textContent = `${grid_rows} * ${grid_cols}`;
}

function create_grid(grid_rows, grid_cols) {
	let opacity = 0;
	for (let i = 1; i <= grid_rows * grid_cols; i++) {
		const grid_box = document.createElement("div");
		grid_box.classList.add("grid-box");
		grid_box.style.width = `${sketch_pad_width / grid_cols - 2}px`;
		grid_box.style.height = `${sketch_pad_height / grid_rows - 2}px`;

		sketch_pad.appendChild(grid_box);
		grid_box.addEventListener("mouseover", () => {
			const rgb_color_R = parseInt(Math.floor(Math.random() * 256));
			const rgb_color_G = parseInt(Math.floor(Math.random() * 256));
			const rgb_color_B = parseInt(Math.floor(Math.random() * 256));
			grid_box.style.backgroundColor = `rgb(${rgb_color_R},${rgb_color_G},${rgb_color_B},${opacity}%)`;
			opacity < 100 ? (opacity += 10) : ""; /* increasing opacity by 10% but if opacity is 100 then it will stop increasing */
		});
	}

	display_grid_dimension(grid_rows, grid_cols);
}

create_grid(grid_rows, grid_cols);
