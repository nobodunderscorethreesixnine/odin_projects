import { Link, useNavigate } from "react-router";
/* importing images */
import bgImg from "../../assets/images/homePageBackGroundImage.jpg";
/* importing style */
import styles from "./HomePage.module.css";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<>
			<section className={styles.introBox}>
				<div className={styles.introBox__textContainer}>
					<h1 className={styles.textContainer__title}>
						Your one-stop shop for everything
					</h1>
					<p className={styles.textContainer__desc}>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Culpa, quibusdam? Lorem ipsum dolor, sit amet
						consectetur adipisicing elit. Exercitationem,
						distinctio. Recusandae repudiandae quisquam eaque.
					</p>
					<button
						className={styles.textContainer__shopBtn}
						onClick={() => navigate("/products")}
					>
						Shop Now
					</button>
				</div>

				<div className={styles.bgImgContainer}>
					<img
						className={styles.bgImg}
						src={bgImg}
						alt="clothes images"
					/>
				</div>
			</section>
		</>
	);
}
