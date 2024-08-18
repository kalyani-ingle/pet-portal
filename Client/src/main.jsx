import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import UserLogin from "./components/UserLogin.jsx";
import App from "./App.jsx";

import PetRegistration from "./components/PetRegistration.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <UserRegistration />,
  },

  {
    path: "/login",
    element: <UserLogin />,
  },

  {
    path: "/pet-register",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <PetRegistration />,
      }
    ]
  }
]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
