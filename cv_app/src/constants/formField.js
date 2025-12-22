import generateID from "../utils/idGenerator";

// bellow variables will help with toggling layout
const SECTIONS = {
	GENERAL: "general",
	EDUCATION: "education",
	PRACTICAL: "practical",
};

// below variables are declared inorder to check latter on, if it is empty or not.
const REQUIRED_FIELDS = {
	[SECTIONS.GENERAL]: [
		"fullName",
		"email",
		"phoneNumber",
		"address",
		"description",
	],

	[SECTIONS.EDUCATION]: [
		"schoolName",
		"studyTitle",
		"startDate",
		"endDate",
		"location",
	],

	[SECTIONS.PRACTICAL]: [
		"companyName",
		"positionTitle",
		"startDate",
		"endDate",
		"location",
		"description",
	],
};

// below code sets the intial value for SECTIONS variables
const INITIAL_FORM_STATE = {
	[SECTIONS.GENERAL]: {
		id: generateID(),
		fullName: "",
		email: "",
		phoneNumber: "",
		address: "",
		description: "",
	},

	[SECTIONS.EDUCATION]: [
		{
			id: generateID(),
			schoolName: "",
			studyTitle: "",
			startDate: "",
			endDate: "",
			location: "",
		},
	],

	[SECTIONS.PRACTICAL]: [
		{
			id: generateID(),
			companyName: "",
			positionTitle: "",
			startDate: "",
			endDate: "",
			location: "",
			description: "",
		},
	],
};

export { SECTIONS, REQUIRED_FIELDS, INITIAL_FORM_STATE };
