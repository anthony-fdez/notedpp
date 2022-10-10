import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bbn450zg.us.auth0.com"
      clientId="fy3ISpMsphF9M9GuI4OnlptzVKCIxH11"
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
