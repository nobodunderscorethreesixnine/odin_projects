import { useState } from "react";
import QuantityStepper from "../Stepper/QuantityStepper";
import { Link } from "react-router";
/* importing styles */
import styles from "./ProductCard.module.css";

export default function ProductCard({ data, handleAddCartItems }) {
	const [itemQuantity, setItemQuantity] = useState(1);
	return (
		<section className={styles.productCard}>
			<Link to={`${data.id}`}>
				<img
					src={data.image}
					alt={data.title}
					className={styles.productCard__img}
				/>
			</Link>
			<p>${data.price}</p>
			<QuantityStepper
				value={itemQuantity}
				updateValue={setItemQuantity}
			/>
			<button
				className={styles.addToCartBtn}
				onClick={() => {
					handleAddCartItems(data, itemQuantity);
					setItemQuantity(1);
				}}
			>
				Add To Cart
			</button>
		</section>
	);
}
