import { useEffect, useState } from "react";

export default function useFetchSingleProduct(id) {
	const [productData, setProductData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`https://fakestoreapi.com/products/${id}`,
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
	}, [id]);
	return { productData, loading, error };
}


// letter on when i refine this api to one of them , i can do this
// it will take 2 params id and url if id is present then it will call other url 
// if not then it will call for default url 