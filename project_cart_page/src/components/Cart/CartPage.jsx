import { useOutletContext } from "react-router";
import QuantityStepper from "../Stepper/QuantityStepper";
/* importing styles */
import styles from "./CartPage.module.css";

export default function CartPage() {
	const calculateTotalPrice = (accum, curValue) =>
		accum + curValue.quantity * curValue.price;
	const { cartItems, handleQuantityChange, handleDeleteCartItems } =
		useOutletContext();

	if (!cartItems.length) {
		return (
			<section className="cart-empty-container">
				<h1>No items in cart.</h1>
			</section>
		);
	}

	return (
		<section className={styles.cartProductContainer}>
			{cartItems.map((item) => (
				<section key={item.id} className={styles.cartProduct}>
					<img
						src={item.image}
						alt={item.title}
						className={styles.productImg}
					/>

					<h4 className={styles.productTitle}>{item.title}</h4>

					<div className={styles.productStepper}>
						<QuantityStepper
							value={item.quantity}
							updateValue={(newQty) =>
								handleQuantityChange(item.id, newQty)
							}
						/>
					</div>
					<strong className={styles.priceLabel}>${item.price}</strong>

					<button
						className={styles.dltBtn}
						onClick={() => handleDeleteCartItems(item.id)}
					>
						X
					</button>
					<p className={styles.subTotal}>
						Sub Total : {item.quantity * item.price}{" "}
					</p>
				</section>
			))}
			<h1 className={styles.cartTotalPrice}>
				Total price :{" "}
				{cartItems.reduce(calculateTotalPrice, 0).toFixed(2)}
			</h1>
		</section>
	);
}
