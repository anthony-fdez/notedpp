import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

const LoginButton: React.FC = (): JSX.Element | null => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) return null;

  return <Button onClick={() => loginWithRedirect()}>LOGIN</Button>;
};

export default LoginButton;
