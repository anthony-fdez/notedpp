import { useAuth0 } from '@auth0/auth0-react';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';

import { RouterProvider } from 'react-router-dom';
import './App.css';
import FullScreenLoad from './components/backdrop/fullScreenLoad';
import { useGlobalStore } from './globalStore/globalStore';

import { routes } from './routes';

const LightTheme = React.lazy(
  () => import('./styles/workAroundComponents/lightTheme')
);
const DarkTheme = React.lazy(
  () => import('./styles/workAroundComponents/darkTheme')
);

function App() {
  const globalStore = useGlobalStore();
  const { isAuthenticated, isLoading } = useAuth0();

  const router = routes({ isAuthenticated, isLoading });

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{
        colorScheme: globalStore.theme,
        white: '#FFFFFF',
        black: '#1A1B1E',
        primaryColor: 'blue',
      }}
    >
      <NotificationsProvider position='top-right'>
        <React.Suspense fallback={<></>}>
          {globalStore.theme === 'dark' ? <DarkTheme /> : <LightTheme />}
        </React.Suspense>

        <div className='App'>
          <FullScreenLoad />
          <RouterProvider router={router} />
        </div>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
