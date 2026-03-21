/* importing styles */
import styles from "./QuantityStepper.module.css";

export default function QuantityStepper({ value, updateValue }) {
	const max = 50;
	const min = 1;

	function increase() {
		if (value < max) updateValue(value + 1);
	}
	function decrease() {
		updateValue(value > 1 ? value - 1 : 1);
	}

	function handleChange(e) {
		const userInput = e.target.value;
		if (userInput === "") {
			updateValue("");
			return;
		}

		const num = Number(userInput);
		if (!Number.isNaN(num) && Number.isInteger(num)) {
			if (num >= min && num <= max) {
				updateValue(num);
			} else if (num < min) {
				updateValue(min);
			} else if (num > max) {
				updateValue(max);
			}
		}
	}

	function handleOnBlur() {
		if (value === "" || Number(value) < 1) updateValue(1);
	}

	return (
		<section className={styles.stepperContainer}>
			<button
				className={styles.stepperBtn}
				disabled={value === max}
				onClick={increase}
			>
				+
			</button>
			<input
				className={styles.stepperInput}
				aria-label="Quantity"
				type="text"
				inputMode="numeric"
				value={value}
				onBlur={handleOnBlur}
				onChange={handleChange}
			/>
			<button
				className={styles.stepperBtn}
				disabled={value === min}
				onClick={decrease}
			>
				-
			</button>
		</section>
	);
}
