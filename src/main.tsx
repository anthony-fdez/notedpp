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
      useRefreshTokens={true}
      cacheLocation="localstorage"
      audience="https://dev-bbn450zg.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
