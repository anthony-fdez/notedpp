import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BackdropSpinner from "./components/backdrop/backdrop";
import { routes } from "./routes";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  const router = routes({ isAuthenticated });

  return (
    <div className="App">
      <BackdropSpinner />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
