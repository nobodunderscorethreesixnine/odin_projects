import { Outlet, useOutletContext } from "react-router";
/* importing styles */
import styles from './ProductPage.module.css'

export default function ProductPage() {
	const { handleAddCartItems } = useOutletContext();

	return (
		<section className={styles.productPage}>
			<Outlet context={{ handleAddCartItems }} />
		</section>
	);
}
