import { useState } from "react";
import { useParams, useOutletContext } from "react-router";
import useFetchSingleProduct from "../Hooks/useFetchSingleProduct";
import QuantityStepper from "../Stepper/QuantityStepper";
/* importing styles */
import styles from "./ProductDetailPage.module.css";

export default function ProductDetail() {
	const [itemQuantity, setItemQuantity] = useState(1);
	const { productId } = useParams();
	const { handleAddCartItems } = useOutletContext();
	const { productData, loading, error } = useFetchSingleProduct(
		Number(productId),
	);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error</h1>;
	if (!productData) return <h1>Product Not Found</h1>;

	return (
		<section className={styles.productDetailContainer}>
			<img
				src={productData.image}
				alt={productData.title}
				className={styles.productImg}
			/>
			<div className={styles.productHdr}>
				<h2 className={styles.productTitle}>{productData.title}</h2>
				<div className={styles.actionGrp}>
					<QuantityStepper
						value={itemQuantity}
						updateValue={setItemQuantity}
					/>
					<button
						onClick={() =>
							handleAddCartItems(productData, itemQuantity)
						}
						className={styles.addToCartBtn}
					>
						Add To Cart
					</button>
				</div>
				<p className={styles.productDesc}>{productData.description}</p>
			</div>
		</section>
	);
}
