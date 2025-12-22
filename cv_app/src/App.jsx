import { useState } from "react";

import "./styles/App.css";
import CvHeader from "./components/headerSection.jsx";
import GeneralInformation from "./components/generalInformationForm.jsx";
import EducationInformation from "./components/educationInfromationForm.jsx";
import PracticalInformation from "./components/practicalInformationForm.jsx";
import RenderCV from "./components/renderCv.jsx";
import generateID from "./utils/idGenerator.js";

// importing constants
import {
	SECTIONS,
	REQUIRED_FIELDS,
	INITIAL_FORM_STATE,
} from "./constants/formField.js";

export default function CvBuilder() {
	const [formData, setFormData] = useState(INITIAL_FORM_STATE);

	const [activeSection, setActiveSection] = useState(SECTIONS.GENERAL);

	const [isPreviewMode, setIspreviewMode] = useState(false);

	function handleChange(e, id = null) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[activeSection]:
				activeSection === SECTIONS.GENERAL
					? { ...prev[SECTIONS.GENERAL], [name]: value }
					: prev[activeSection].map((item) =>
							item.id === id ? { ...item, [name]: value } : item
					  ),
		}));
	}

	function deleteEntry(deletedId) {
		setFormData((prev) => ({
			...prev,
			[activeSection]: prev[activeSection].filter(
				(item) => item.id !== deletedId
			),
		}));
	}

	function addNewEntry() {
		const newEntry = {
			id: generateID(),
			...(activeSection === SECTIONS.EDUCATION
				? {
						schoolName: "",
						studyTitle: "",
						startDate: "",
						endDate: "",
						location: "",
				  }
				: {
						companyName: "",
						positionTitle: "",
						startDate: "",
						endDate: "",
						location: "",
						practicalExpDesc: "",
				  }),
		};

		setFormData((prev) => ({
			...prev,
			[activeSection]: [...prev[activeSection], newEntry],
		}));
	}

	function isFormCompleted() {
		const isGeneralFormFilled = REQUIRED_FIELDS[SECTIONS.GENERAL].every(
			(key) => formData[SECTIONS.GENERAL][key] !== ""
		);

		const isEducationFormFilled =
			formData[SECTIONS.EDUCATION].length > 0 &&
			formData[SECTIONS.EDUCATION].every((entry) =>
				REQUIRED_FIELDS[SECTIONS.EDUCATION].every(
					(key) => entry[key] !== ""
				)
			);

		const isPracticalFormFilled =
			formData[SECTIONS.PRACTICAL].length > 0 &&
			formData[SECTIONS.PRACTICAL].every((entry) =>
				REQUIRED_FIELDS[SECTIONS.PRACTICAL].every(
					(key) => entry[key] !== ""
				)
			);

		return (
			isGeneralFormFilled &&
			isEducationFormFilled &&
			isPracticalFormFilled
		);
	}

	const showPreview = () => setIspreviewMode(true);
	const showForm = () => setIspreviewMode(false);

	if (isPreviewMode) {
		return (
			<>
				<RenderCV userData={formData} onClickEdit={showForm} />
			</>
		);
	}

	return (
		<>
			<CvHeader />
			<section className="cv-container">
				<nav className="cv-container-hdr">
					<button
						onClick={() => setActiveSection(SECTIONS.GENERAL)}
						className={
							activeSection === SECTIONS.GENERAL ? "active" : ""
						}
					>
						General Information
					</button>
					<button
						onClick={() => setActiveSection(SECTIONS.EDUCATION)}
						className={
							activeSection === SECTIONS.EDUCATION ? "active" : ""
						}
					>
						Education Information
					</button>
					<button
						onClick={() => setActiveSection(SECTIONS.PRACTICAL)}
						className={
							activeSection === SECTIONS.PRACTICAL ? "active" : ""
						}
					>
						Practical Information
					</button>
				</nav>
				{activeSection === SECTIONS.GENERAL && (
					<GeneralInformation
						{...formData[SECTIONS.GENERAL]}
						onChange={handleChange}
					/>
				)}

				{activeSection === SECTIONS.EDUCATION &&
					formData[SECTIONS.EDUCATION].map(
						({ id, ...formFields }) => (
							<EducationInformation
								key={id}
								{...formFields}
								onChange={(e) => handleChange(e, id)}
								onDeleted={() => deleteEntry(id)}
							/>
						)
					)}

				{activeSection === SECTIONS.PRACTICAL &&
					formData[SECTIONS.PRACTICAL].map(
						({ id, ...formFields }) => (
							<PracticalInformation
								key={id}
								{...formFields}
								onChange={(e) => handleChange(e, id)}
								onDeleted={() => deleteEntry(id)}
							/>
						)
					)}
			</section>

			<div className="crud-btns">
				{isFormCompleted() && (
					<button onClick={showPreview}>Generate CV</button>
				)}

				{(activeSection === SECTIONS.EDUCATION ||
					activeSection === SECTIONS.PRACTICAL) && (
					<button onClick={addNewEntry}>+</button>
				)}
			</div>
		</>
	);
}
