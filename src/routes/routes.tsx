import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // admin routes
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },

  // faculty routes
  {
    path: "/faculty",
    element: <App />,
    children: adminRoutes,
  },

  // student routes
  {
    path: "/student",
    element: <App />,
    children: adminRoutes,
  },

  // authentication routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
