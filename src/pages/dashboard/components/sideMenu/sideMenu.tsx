import { useAuth0 } from "@auth0/auth0-react";
import { Button, NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IFolder } from "../../../../interfaces/IFolder";
import { INote } from "../../../../interfaces/INote";
import SideMenuSkeleton from "../sideMenuSkeleton/sideMenuSkeleton";
import FolderItem from "./folderItem/folderItem";
import styles from "./sideMenu.module.css";

import { MdOutlineCreate } from "react-icons/md";
import NewFolderModal from "./newFolderModal/newFolderModal";
interface Props {
  folders: IFolder[] | null;
  isLoadingNotes: boolean;
}

const SideMenu = ({ folders, isLoadingNotes }: Props): JSX.Element | null => {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  if (isLoadingNotes)
    return (
      <div className={styles.container}>
        <SideMenuSkeleton />
      </div>
    );
  if (!folders) return null;

  return (
    <>
      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        handleClose={() => setIsNewFolderModalOpen(false)}
      />
      <div className={styles.container}>
        <Button
          leftIcon={<MdOutlineCreate />}
          className={styles.new_folder_button}
          onClick={() => setIsNewFolderModalOpen(true)}
        >
          Create new folder
        </Button>

        {folders.map((folder: IFolder) => {
          return <FolderItem key={folder.id} folder={folder} />;
        })}
      </div>
    </>
  );
};

export default SideMenu;
