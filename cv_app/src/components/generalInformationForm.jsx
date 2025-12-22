import { REQUIRED_FIELDS, SECTIONS } from "../constants/formField.js";
import { FormField, TextAreaField } from "./formField.jsx";

export default function GeneralInformation({
	fullName,
	email,
	phoneNumber,
	address,
	description,
	onChange,
}) {
	return (
		<main className="form-container">
			<FormField
				labelName="Full Name"
				name="fullName"
				value={fullName}
				onChange={onChange}
			/>

			<FormField
				labelName="Email"
				name="email"
				type="email"
				value={email}
				onChange={onChange}
			/>

			<FormField
				labelName="Phone Number"
				name="phoneNumber"
				type="tel"
				value={phoneNumber}
				onChange={onChange}
			/>

			<FormField
				labelName="Address"
				name="address"
				value={address}
				onChange={onChange}
			/>

			<TextAreaField
				name="description"
				placeholder="Describe about yourself"
				value={description}
				onChange={onChange}
			></TextAreaField>
		</main>
	);
}
