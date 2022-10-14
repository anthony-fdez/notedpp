import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IFolder } from "../../../../interfaces/IFolder";
import { INote } from "../../../../interfaces/INote";
import SideMenuSkeleton from "../sideMenuSkeleton/sideMenuSkeleton";
import FolderItem from "./folderItem/folderItem";
import styles from "./sideMenu.module.css";

import { MdOutlineCreate } from "react-icons/md";
import NewFolderModal from "./modals/newFolderModal/newFolderModal";
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

  const renderFolderList = () => {
    if (!folders) {
      return (
        <Alert color="red" title="Hmm, something failed...">
          There was an error getting your notes, try again later.
        </Alert>
      );
    }

    if (folders.length === 0) {
      return (
        <Alert color="blue" title="So empty...">
          You don&apos;t have any notes yet. Start by creating a folder!
        </Alert>
      );
    }

    return folders.map((folder: IFolder) => {
      return <FolderItem key={folder.id} folder={folder} />;
    });
  };

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
        {renderFolderList()}
      </div>
    </>
  );
};

export default SideMenu;
