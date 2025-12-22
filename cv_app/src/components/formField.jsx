import "../styles/formStyles.css";

function FormField({
	labelName,
	name,
	type = "text",
	value,
	onChange,
	required = true,
}) {
	return (
		<p>
			<input
				className="input"
				placeholder=""
				name={name}
				required={required}
				value={value}
				onChange={onChange}
				type={type}
				autoComplete="on"
			/>
			<label className="label">{labelName}</label>
		</p>
	);
}

function TextAreaField({ name, placeholder, value, onChange }) {
	return (
		<textarea
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		></textarea>
	);
}

export { FormField, TextAreaField };
