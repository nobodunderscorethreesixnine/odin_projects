import { useOutletContext } from "react-router";
import ProductCard from "./ProductCard";
import useProducts from "../Hooks/useProducts";
/* importing styles */
import styles from './ProductList.module.css'

export default function ProductList() {
	const { handleAddCartItems } = useOutletContext();
	const { productData, loading, error } = useProducts();

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error</h1>;
	if (!productData || productData.length === 0) return <h1>No Products Found</h1>

	return (
		<section className={styles.productListGrid}>
			{productData.map((data) => (
				<ProductCard
					key={data.id}
					data={data}
					handleAddCartItems={handleAddCartItems}
				/>
			))}
		</section>
	);
}