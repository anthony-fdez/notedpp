import { useAuth0 } from '@auth0/auth0-react';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';

import { RouterProvider } from 'react-router-dom';
import './App.css';
import FullScreenLoad from './components/backdrop/fullScreenLoad';
import { useGlobalStore } from './globalStore/globalStore';

import { SpotlightProvider } from '@mantine/spotlight';
import { spotlightActions } from './spotlight/actions';
import { AiOutlineSearch } from 'react-icons/ai';

import { routes } from './routes';

const LightTheme = React.lazy(
  () => import('./styles/workAroundComponents/lightTheme')
);
const DarkTheme = React.lazy(
  () => import('./styles/workAroundComponents/darkTheme')
);

function App() {
  const globalStore = useGlobalStore();
  const { isAuthenticated, logout } = useAuth0();

  const router = routes({ isAuthenticated });

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{
        colorScheme: globalStore.theme,
        white: '#FFFFFF',
        black: '#1a1b1e',
        primaryColor: 'blue',
      }}
    >
      <NotificationsProvider position='top-right'>
        <SpotlightProvider
          actions={spotlightActions({
            globalStore,
            logout,
            isAuthenticated,
          })}
          limit={7}
          searchPlaceholder='Search for notes or actions...'
          shortcut={['mod + P', 'mod + K', '/']}
          searchIcon={<AiOutlineSearch />}
          highlightQuery
          nothingFoundMessage='Hmm... nothing matches your search'
          overlayBlur={0}
          overlayOpacity={0.7}
        >
          <React.Suspense fallback={<></>}>
            {globalStore.theme === 'dark' ? <DarkTheme /> : <LightTheme />}
          </React.Suspense>
          <div className='App'>
            <FullScreenLoad />
            <RouterProvider router={router} />
          </div>
        </SpotlightProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
