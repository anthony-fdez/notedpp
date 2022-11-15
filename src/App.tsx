import { useAuth0 } from '@auth0/auth0-react';

import {
  LoadingOverlay,
  MantineProvider,
  useMantineTheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';
import './App.css';
import FullScreenLoad from './components/backdrop/fullScreenLoad';
import { useGlobalStore } from './globalStore/globalStore';
import AppBroke from './pages/errors/appBroke/appBroke';

import { routes } from './routes';

const LightTheme = React.lazy(
  () => import('./styles/workAroundComponents/lightTheme')
);
const DarkTheme = React.lazy(
  () => import('./styles/workAroundComponents/darkTheme')
);

function App() {
  const globalStore = useGlobalStore();
  const theme = useMantineTheme();
  const { isAuthenticated, isLoading, error } = useAuth0();

  const router = routes({ isAuthenticated, isLoading });

  if (error) {
    return (
      <AppBroke message="Looks like this error was caused by an authentication issue, try logging out and back in and hopefully the problem won't persist." />
    );
  }

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{
        globalStyles: (theme) => ({
          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
        }),
        colorScheme: globalStore.theme,
        white: theme.colors.gray[0],
        black: theme.colors.dark[9],
        primaryColor: 'blue',
      }}
    >
      <NotificationsProvider position='top-right'>
        <Suspense fallback={<LoadingOverlay visible overlayBlur={3} />}>
          {globalStore.theme === 'dark' ? <DarkTheme /> : <LightTheme />}
          <div className='App'>
            <FullScreenLoad />
            <RouterProvider router={router} />
          </div>
        </Suspense>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
