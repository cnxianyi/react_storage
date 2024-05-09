import AuthRoute from "@/components/AuthRoute";
import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login";
import Home from "@/pages/home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home></Home>,
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
]);

export { router };
