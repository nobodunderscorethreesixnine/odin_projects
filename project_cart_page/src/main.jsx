import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";

// importing router configurations
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./Routes/routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
