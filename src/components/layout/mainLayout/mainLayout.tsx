import React from 'react';
import { useGlobalStore } from '../../../globalStore/globalStore';
import Header from '../../header/header';
import styles from './mainLayout.module.css';

import { SpotlightProvider } from '@mantine/spotlight';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { spotlightActions } from '../../../spotlight/actions';

interface Props {
  children: JSX.Element;
}

const MainLayout = ({ children }: Props): JSX.Element => {
  const globalStore = useGlobalStore();
  const { isAuthenticated, logout } = useAuth0();

  return (
    <>
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
        <Header />
        <div className={styles.children_container}>{children}</div>
      </SpotlightProvider>
    </>
  );
};

export default MainLayout;
