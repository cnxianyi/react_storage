import AuthRoute from "@/components/AuthRoute";
import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Test from "@/pages/home/test";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home></Home>,
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
	{
		path: "/test",
		element: <Test></Test>,
	},
]);

export { router };
