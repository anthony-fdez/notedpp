import { ActionIcon, Kbd } from '@mantine/core';
import React, { useState } from 'react';

import styles from './header.module.css';

import { TbUser } from 'react-icons/tb';
import ProfileDrawer from '../profileDrawer/profileDrawer';
import { FiMenu } from 'react-icons/fi';
import { useGlobalStore } from '../../globalStore/globalStore';
import { Loader } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { Input } from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { openSpotlight } from '@mantine/spotlight';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const Header: React.FC = (): JSX.Element => {
  const theme = useMantineTheme();
  const globalStore = useGlobalStore();
  const location = useLocation();

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  const headerLeft = () => {
    if (location.pathname.includes('collaborate')) {
      return (
        <div className={styles.sync_container}>
          <Link
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            to='/dashboard'
          >
            <BsArrowLeft style={{ marginRight: '10px' }} size={24} />
            <h3>Noted++</h3>
          </Link>
        </div>
      );
    }

    if (globalStore.isLoadingFolders) {
      return (
        <div className={styles.sync_container}>
          <Loader size='sm' />
          <p>Syncing Notes</p>
        </div>
      );
    }

    return (
      <div className={styles.sync_container}>
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to='/dashboard'
        >
          <h3>Noted++</h3>
        </Link>
      </div>
    );
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
        {headerLeft()}
        <div className={styles.header_right_container}>
          <Input
            onClick={() => openSpotlight()}
            className={styles.desktop_search_bar}
            icon={<AiOutlineSearch />}
            placeholder='Search Noted++'
            radius={5}
            rightSectionWidth={60}
            rightSection={
              <>
                <Kbd>⌘ + K</Kbd>
              </>
            }
          />
          <ActionIcon
            size={'lg'}
            color={'blue'}
            variant='light'
            className={styles.mobile_search_button}
            onClick={() => openSpotlight()}
          >
            <AiOutlineSearch />
          </ActionIcon>
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
