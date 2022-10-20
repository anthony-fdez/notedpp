import { ActionIcon } from '@mantine/core';
import React, { useState } from 'react';

import LoginButton from '../auth/loginButton/loginButton';
import styles from './header.module.css';

import { TbUser } from 'react-icons/tb';
import ProfileDrawer from '../profileDrawer/profileDrawer';
import { FiMenu } from 'react-icons/fi';
import { useGlobalStore } from '../../globalStore/globalStore';
import { Loader } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const Header: React.FC = (): JSX.Element => {
  const theme = useMantineTheme();
  const globalStore = useGlobalStore();

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  const syncDataSpinner = () => {
    if (globalStore.isLoadingFolders) {
      return (
        <div className={styles.sync_container}>
          <Loader size='sm' />
          <p>Syncing Notes</p>
        </div>
      );
    }

    return <h3>Noted++</h3>;
  };

  return (
    <header
      style={{
        backgroundColor:
          globalStore.theme === 'dark' ? theme.black : theme.white,
      }}
      className={styles.container}
    >
      <ProfileDrawer
        isOpen={isUserDrawerOpen}
        handleClose={() => setIsUserDrawerOpen(false)}
      />
      <div className={styles.content}>
        <ActionIcon
          onClick={() => globalStore.setIsMobileMenuOpen(true)}
          className={styles.action_icon_mobile_menu}
        >
          {<FiMenu />}
        </ActionIcon>
        {syncDataSpinner()}
        <div className={styles.header_right_container}>
          <LoginButton />
          <ActionIcon
            className={styles.profile_button}
            size='lg'
            color='blue'
            variant='light'
            onClick={() => setIsUserDrawerOpen(true)}
          >
            <TbUser size={18} />
          </ActionIcon>
        </div>
      </div>
    </header>
  );
};

export default Header;
