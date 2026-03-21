import { Link, NavLink } from "react-router";
// importing styles
import styles from "./HeaderPage.module.css";
// importing image
import logoImg from "../../assets/images/hangerImg.png";
import cartImg from "../../assets/images/cartImg.png";

export default function Header({ cartQuantity }) {
	return (
		<header className={styles.hdrContainer}>
			<Link to="/">
				<img src={logoImg} alt="navLogo" className={styles.navLogo} />
			</Link>

			<nav className={styles.hdrNav}>
				<NavLink
					to="/"
					aria-label="home"
					className={({ isActive }) =>
						isActive
							? `${styles.navLink} ${styles.active}`
							: `${styles.navLink}`
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/products"
					aria-label="products"
					className={({ isActive }) =>
						isActive
							? `${styles.navLink} ${styles.active}`
							: `${styles.navLink}`
					}
				>
					Product
				</NavLink>
			</nav>

			<div className={styles.cartContainer}>
				<NavLink to="/cart" aria-label="cart">
					<img
						src={cartImg}
						alt="cart img"
						className={styles.navCartLogo}
					/>
					<span className={styles.cartBadge}>{cartQuantity}</span>

				</NavLink>
			</div>
		</header>
	);
}