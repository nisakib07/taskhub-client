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
import Ongoing from "./components/Ongoing/Ongoing";
import Completed from "./components/Completed/Completed";
import MyProfile from "./components/MyProfile/MyProfile";
import AddTask from "./components/AddTask/AddTask";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditTask from "./components/EditTask/EditTask";

const queryClient = new QueryClient();

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
        element: (
          <PrivateRoute>
            <Tasks></Tasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDashboard/ongoing-tasks",
        element: (
          <PrivateRoute>
            <Ongoing></Ongoing>
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDashboard/completed-tasks",
        element: (
          <PrivateRoute>
            <Completed></Completed>
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDashboard/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDashboard/add-task",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDashboard/editTask/:id",
        element: (
          <PrivateRoute>
            <EditTask></EditTask>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          closeOnClick
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover={false}></ToastContainer>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
