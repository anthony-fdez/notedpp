import React, { useEffect, useState } from "react";
import { IFolder } from "../../interfaces/IFolder";
import Axios from "axios";
import { useGlobalStore } from "../../globalStore/globalStore";
import styles from "./dashboard.module.css";
import SideMenu from "./components/sideMenu/sideMenu";
import Note from "./components/note/note";

const Dashboard = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  useEffect(() => {
    globalStore.updateFolders();
  }, [globalStore.user]);

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
