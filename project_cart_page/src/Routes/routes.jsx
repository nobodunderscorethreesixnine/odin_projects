import HomePage from "../components/Home/HomePage";
import CartPage from "../components/Cart/CartPage";
import ProductPage from "../components/Product/ProductPage";
import App from "../App";
import ProductDetail from "../components/Product/ProductDetailPage";
import ProductList from "../components/Product/ProductList";
import ErrorPage from "../components/Error/ErrorPage";

export const routes = [
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "products",
				element: <ProductPage />,
				children: [
					{
						index: true,
						element: <ProductList />,
					},
					{
						path: ":productId",
						element: <ProductDetail />,
					},
				],
			},
			{
				path: "cart",
				element: <CartPage />,
			},
		],
	},
];
