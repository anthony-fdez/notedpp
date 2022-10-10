import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BackdropSpinner from "./components/backdrop/backdrop";
import MainLayout from "./components/layout/mainLayout/mainLayout";
import AppBroke from "./pages/errors/appBroke/appBroke";
import NotFound from "./pages/errors/notFound/notFound";
import Home from "./pages/home/home";

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
