import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';
import React from 'react';
const LoginButtonHome: React.FC = (): JSX.Element | null => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) return null;

  return (
    <Button
      onClick={() => loginWithRedirect()}
      size='lg'
      variant='gradient'
      gradient={{ from: 'indigo', to: 'cyan' }}
    >
      LOGIN OR Register
    </Button>
  );
};

export default LoginButtonHome;
