import { useState, useEffect } from "react";

export default function useProducts() {
	const [productData, setProductData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					"https://fakestoreapi.com/products",
					// "https://fakestoreapi.com/products?limit=20",
				);
				if (!response.ok) throw new Error("Server Error");
				const data = await response.json();
				setProductData(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, []);

	return { productData, loading, error };
}
