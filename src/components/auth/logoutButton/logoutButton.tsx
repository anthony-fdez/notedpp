import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import React from "react";
import { useGlobalStore } from "../../../globalStore/globalStore";

const LogoutButton: React.FC = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    globalStore.setFolders(null);
    globalStore.setSelectedNote(null);
    globalStore.setUser(null);

    logout();
  };

  if (!isAuthenticated) return null;

  return (
    <Button color="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
