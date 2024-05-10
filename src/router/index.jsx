import AuthRoute from "@/components/AuthRoute";
import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Test from "@/pages/home/test";
import Files from "@/pages/files";
import Monitor from "@/pages/monitor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/test",
        element: <Test></Test>,
      },
      {
        path: "/files",
        element: <Files></Files>,
      },
      {
        path: "/monitor",
        element: <Monitor></Monitor>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };
