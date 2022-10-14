import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { IFolder } from "../../../../interfaces/IFolder";
import SideMenuSkeleton from "../sideMenuSkeleton/sideMenuSkeleton";
import styles from "./sideMenu.module.css";

interface Props {
  folders: IFolder[] | null;
  isLoadingNotes: boolean;
}

const SideMenu = ({ folders, isLoadingNotes }: Props): JSX.Element | null => {
  if (isLoadingNotes)
    return (
      <div className={styles.container}>
        <SideMenuSkeleton />
      </div>
    );
  if (!folders) return null;

  return <div className={styles.container}></div>;
};

export default SideMenu;
