import { useState } from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/home";
import MainLayout from "./components/layout/mainLayout/mainLayout";
import RegisterScreen from "./pages/auth/register/register";
import NotFound from "./pages/errors/notFound/notFound";
import AppBroke from "./pages/errors/appBroke/appBroke";
import LoginScreen from "./pages/auth/login/login";
import { Backdrop } from "@mui/material";
import BackdropSpinner from "./components/backdrop/backdrop";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    errorElement: <AppBroke />,
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/register",
    errorElement: <AppBroke />,
    element: (
      <MainLayout>
        <RegisterScreen />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    errorElement: <AppBroke />,
    element: (
      <MainLayout>
        <LoginScreen />
      </MainLayout>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <BackdropSpinner />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
