import React, { useEffect } from 'react';

import { useGlobalStore } from '../../globalStore/globalStore';
import styles from './dashboard.module.css';
import SideMenu from './components/sideMenu/sideMenu';
import Note from './components/note/note';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';

const Dashboard = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  useEffect(() => {
    globalStore.updateFolders();
  }, [globalStore.user]);

  useEffect(() => {
    globalStore.setIsMobileMenuOpen(false);
  }, [globalStore.selectedNote]);

  return (
    <AnimateOnScreenLoad>
      <>
        <SideMenu />
        <div className={styles.dashboard_container}>
          <Note />
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Dashboard;
