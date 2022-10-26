import { useAuth0 } from '@auth0/auth0-react';

interface IHandleLogout {
  globalStore: IGlobalStore;
  logout: any;
}

export const handleLogout = ({ globalStore, logout }: IHandleLogout) => {
  globalStore.setFolders(null);
  globalStore.setSelectedNote(null);
  globalStore.setUser(null);

  logout();
};

import { Button } from '@mantine/core';
import React from 'react';
import { IGlobalStore, useGlobalStore } from '../../../globalStore/globalStore';

const LogoutButton: React.FC = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <Button
      color='red'
      onClick={() => {
        handleLogout({ globalStore, logout });
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
