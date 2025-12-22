import { FormField, TextAreaField } from "./formField.jsx";

export default function EducationInformation({
	schoolName,
	studyTitle,
	startDate,
	endDate,
	location,
	onDeleted,
	onChange,
}) {
	return (
		<main className="form-container">
			<FormField
				labelName="School Name"
				name="schoolName"
				value={schoolName}
				onChange={onChange}
			/>

			<FormField
				labelName="Title Of Study"
				name="studyTitle"
				type="text"
				value={studyTitle}
				onChange={onChange}
			/>

			<FormField
				labelName="Start Date"
				name="startDate"
				type="date"
				value={startDate}
				onChange={onChange}
			/>

			<FormField
				labelName="End Date"
				name="endDate"
				type="text"
				value={endDate}
				onChange={onChange}
			/>

			<FormField
				labelName="Location"
				name="location"
				type="text"
				value={location}
				onChange={onChange}
			/>

			<button className="dlt-btn" onClick={onDeleted}>
				X
			</button>
		</main>
	);
}
