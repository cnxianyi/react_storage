import AuthRoute from "@/components/AuthRoute";
import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login";
import Home from "@/pages/home";
import Test from "@/pages/home/test";
import Files from "@/pages/files";
import Monitor from "@/pages/monitor";
import Edit from "@/pages/edit";
import AboutPage from "@/pages/about";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "/files",
        element: <Files></Files>,
      },
      {
        path: "/monitor",
        element: <Monitor></Monitor>,
      },
      {
        path: "/edit",
        element: <Edit></Edit>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };
