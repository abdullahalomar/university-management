import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import routesGenerator from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // admin routes
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminPaths),
  },

  // faculty routes
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator(facultyPaths),
  },

  // student routes
  {
    path: "/student",
    element: <App />,
    children: routesGenerator(studentPaths),
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
