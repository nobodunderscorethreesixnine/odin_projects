function caesarCipher(str, shift) {
	return str
		.split("")
		.map((char) => shiftCharacter(char, shift))
		.join("");
}

function shiftCharacter(char, shift) {
	const isUpperCase = char >= "A" && char <= "Z";
	const isLowerCase = char >= "a" && char <= "z";

	if (isUpperCase || isLowerCase) {
		const base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);
		return String.fromCharCode(
			((((char.charCodeAt(0) - base + shift) % 26) + 26) % 26) + base
		);
	}
	return char;
}
export { caesarCipher };
