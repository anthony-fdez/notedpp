import React, { useEffect } from "react";

import { useGlobalStore } from "../../globalStore/globalStore";
import styles from "./dashboard.module.css";
import SideMenu from "./components/sideMenu/sideMenu";
import Note from "./components/note/note";

const Dashboard = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  useEffect(() => {
    globalStore.updateFolders();
  }, [globalStore.user]);

  useEffect(() => {
    globalStore.setIsMobileMenuOpen(false);
  }, [globalStore.selectedNote]);

  return (
    <>
      <SideMenu isLoadingNotes={globalStore.isLoadingFolders} />

      <div className={styles.dashboard_container}>
        <Note />
      </div>
    </>
  );
};

export default Dashboard;
