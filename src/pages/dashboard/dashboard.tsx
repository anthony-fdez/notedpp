import React, { lazy, Suspense, useEffect } from 'react';

import { useGlobalStore } from '../../globalStore/globalStore';
import styles from './dashboard.module.css';
import SideMenu from './components/sideMenu/sideMenu';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import { LoadingOverlay } from '@mantine/core';
import FolderDashboard from './components/folderDashboard/folderDashboard';

const Note = lazy(() => import('./components/note/note'));

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
          <Suspense
            fallback={<LoadingOverlay visible={true} overlayBlur={3} />}
          >
            {globalStore.isFolderDashboard ? <FolderDashboard /> : <Note />}
          </Suspense>
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Dashboard;
