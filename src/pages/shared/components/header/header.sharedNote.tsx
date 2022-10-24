import { useMantineTheme } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from '../../../../components/profileDrawer/settings/components/themeSwitch/themeSwitch';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import styles from './header.module.css';

const Header = () => {
  const globalStore = useGlobalStore();
  const theme = useMantineTheme();

  return (
    <div
      style={
        globalStore.theme === 'dark'
          ? {
              backgroundColor: theme.black,
              borderBottom: '1px solid rgb(50,50,50)',
            }
          : {
              backgroundColor: theme.white,
              borderBottom: '1px solid rgb(230,230,230)',
            }
      }
      className={styles.container}
    >
      <div className={styles.content}>
        <Link className={styles.link} to='/dashboard'>
          <h3>Noted++</h3>
        </Link>
        <div className={styles.header_right}>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
