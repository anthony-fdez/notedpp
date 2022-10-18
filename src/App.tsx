import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import BackdropSpinner from './components/backdrop/backdrop';
import { routes } from './routes';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useGlobalStore } from './globalStore/globalStore';
import './editor.scss';

function App() {
  const globalStore = useGlobalStore();
  const { isAuthenticated } = useAuth0();

  const router = routes({ isAuthenticated });

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{
        colorScheme: globalStore.theme,
        white: '#FFFFFF',
        black: '#1a1a1a',
        primaryColor: 'blue',
      }}
    >
      <NotificationsProvider>
        <div className='App'>
          <BackdropSpinner />
          <RouterProvider router={router} />
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
