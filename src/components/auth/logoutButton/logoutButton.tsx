import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import React, { useEffect } from "react";

const LogoutButton: React.FC = (): JSX.Element | null => {
  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) return null;

  return <Button onClick={() => logout()}>Logout</Button>;
};

export default LogoutButton;
