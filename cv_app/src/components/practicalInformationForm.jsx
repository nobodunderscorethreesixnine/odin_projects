import { FormField, TextAreaField } from "./formField.jsx";

export default function PracticalInformation({
	companyName,
	positionTitle,
	startDate,
	endDate,
	location,
	description,
	onDeleted,
	onChange,
}) {
	return (
		<main className="form-container">
			<FormField
				labelName="Company Name"
				name="companyName"
				value={companyName}
				onChange={onChange}
			/>

			<FormField
				labelName="position Title"
				name="positionTitle"
				value={positionTitle}
				onChange={onChange}
			/>
			<FormField
				labelName="Start Date"
				type="date"
				name="startDate"
				value={startDate}
				onChange={onChange}
			/>
			<FormField
				labelName="End Date"
				type="text"
				name="endDate"
				value={endDate}
				onChange={onChange}
			/>

			<FormField
				labelName="location"
				type="text"
				name="location"
				value={location}
				onChange={onChange}
			/>

			<TextAreaField
				name="description"
				placeholder={"Describe about your position"}
				value={description}
				onChange={onChange}
			/>

			<button className="dlt-btn" onClick={onDeleted}>
				X
			</button>
		</main>
	);
}
