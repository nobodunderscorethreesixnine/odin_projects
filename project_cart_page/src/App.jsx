import { useState } from "react";
import { Outlet } from "react-router";
// importing component
import Header from "./components/Header/HeaderPage";
// importing styles
import "./App.css";
import Footer from "./components/Footer/FooterPage";

export default function App() {
	const [cartItems, setCartItems] = useState([]);

	function handleAddCartItems(data, quantity) {
		setCartItems((prev) => {
			const index = prev.findIndex((item) => item.id === data.id);

			if (index !== -1) {
				const updatedItem = [...prev];

				updatedItem[index] = {
					...updatedItem[index],
					quantity: updatedItem[index].quantity + quantity,
				};
				return updatedItem;
			}
			return [...prev, { ...data, quantity: quantity }];
		});
	}

	function handleDeleteCartItems(id) {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	}

	function handleQuantityChange(id, newQty) {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: newQty } : item,
			),
		);
	}

	return (
		<section className="app-container">
			<section className="app-container__hdr">
				<Header
					cartQuantity={cartItems.reduce(
						(accum, arr) => accum + arr.quantity,
						0,
					)}
				/>
			</section>

			<main className="app-container__content">
				<Outlet
					context={{
						cartItems,
						handleAddCartItems,
						handleQuantityChange,
						handleDeleteCartItems,
					}}
				/>
			</main>

			<section className="app-container__ftr">
				<Footer />
			</section>
		</section>
	);
}
