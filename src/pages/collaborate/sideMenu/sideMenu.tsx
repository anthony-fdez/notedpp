import { Drawer } from '@mantine/core';
import React from 'react';
import { useGlobalStore } from '../../../globalStore/globalStore';
import styles from './sideMenu.module.css';

const CollaborationSideMenu = () => {
  const globalStore = useGlobalStore();

  const sideMenuContents = () => {
    return (
      <div>
        <p>Noted++ Collaboration</p>
      </div>
    );
  };

  return (
    <>
      <div className={styles.mobile_menu}>
        <Drawer
          className={styles.drawer}
          lockScroll={false}
          opened={globalStore.isMobileMenuOpen}
          onClose={() => globalStore.setIsMobileMenuOpen(false)}
          title='Noted++'
          padding='xl'
          size='xl'
        >
          {sideMenuContents()}
        </Drawer>
      </div>
      <div className={styles.desktop_menu}>
        <div
          style={{
            borderRight: `1px solid ${
              globalStore.theme === 'dark'
                ? 'rgb(80,80,80)'
                : 'rgb(230,230,230)'
            }`,
          }}
          className={styles.container}
        >
          {sideMenuContents()}
        </div>
      </div>
    </>
  );
};

export default CollaborationSideMenu;
