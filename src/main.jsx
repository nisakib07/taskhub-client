import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskDashboard from "./components/TaskDashboard/TaskDashboard";
import Tasks from "./components/Tasks/Tasks";
import AuthProvider from "./Providers/AuthProvider";
import PrivateRoute from "./RouterProvider/PrivateRoute";

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
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/taskDashboard",
    element: (
      <PrivateRoute>
        <TaskDashboard></TaskDashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/taskDashboard/tasks",
        element: <Tasks></Tasks>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </React.StrictMode>
);
