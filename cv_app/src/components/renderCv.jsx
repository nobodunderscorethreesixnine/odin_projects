import { REQUIRED_FIELDS, SECTIONS } from "../constants/formField";
import "../styles/renderCv.css";
import mailIcon from "../assets/mail.png";
import phoneIcon from "../assets/phone-call.png";
import locationIcon from "../assets/location-pin.png";

function PersonalInformation({ data }) {
	return (
		<>
			<section className="personal-info">
				<h1>{data.fullName}</h1>
				<ul>
					<li>
						<img src={mailIcon} alt="mail-icon" />
						{data.email}
					</li>
					<li>
						<img src={phoneIcon} alt="phone-icon" />{" "}
						{data.phoneNumber}
					</li>
					<li>
						<img src={locationIcon} alt="location-icon" />{" "}
						{data.address}
					</li>
				</ul>
			</section>
			<p className="about-me">{data.description}</p>
		</>
	);
}

function InfoSection({ title, data, renderItem, className }) {
	return (
		<section className={`${className}-section`}>
			<h2>{title}</h2>
			{data.map((item) => (
				<div key={item.id} className={`${className}-item`}>
					<section className="info-col-1">
						<i>
							{item.startDate} - {item.endDate}
						</i>
						<address>{item.location}</address>
					</section>
					<section className="info-col-2">{renderItem(item)}</section>
				</div>
			))}
		</section>
	);
}

export default function RenderCV({ userData, onClickEdit }) {
	return (
		<div className="cv-display-wrapper">
			<div className="mobile-warning">
				⚠️ For the best experience, view this CV on a larger screen or
				view in desktop mode.
			</div>
			<section className="cv-display-container">
				<PersonalInformation data={userData[SECTIONS.GENERAL]} />
				<InfoSection
					title="Education"
					data={userData[SECTIONS.EDUCATION]}
					className="education-info"
					renderItem={(item) => (
						<>
							<strong>{item.schoolName}</strong>
							<p>{item.studyTitle}</p>
						</>
					)}
				/>

				<InfoSection
					title="Practical"
					data={userData[SECTIONS.PRACTICAL]}
					className="practical-info"
					renderItem={(item) => (
						<>
							<strong>{item.companyName}</strong>
							<strong>{item.positionTitle}</strong>
							<p>{item.description}</p>
						</>
					)}
				/>
			</section>
			<div className="edit-btn">
				<button onClick={onClickEdit}>Edit</button>
			</div>
		</div>
	);
}
