import { Alert, Button, Menu, NavLink } from "@mantine/core";
import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { IFolder } from "../../../../../interfaces/IFolder";
import { INote } from "../../../../../interfaces/INote";
import DeleteFolderModal from "../modals/deleteFolderModal/deleteFolderModal";
import RenameFolderModal from "../modals/renameFolderModal/renameFolderModal";
import NoteItem from "../noteItem/noteItem";
import styles from "./folderItem.module.css";

interface Props {
  folder: IFolder;
}

const FolderItem = ({ folder }: Props): JSX.Element | null => {
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);

  if (!folder) return null;

  const actionsButton = () => {
    return (
      <>
        <DeleteFolderModal
          isOpen={isDeleteFolderModalOpen}
          handleClose={() => setIsDeleteFolderModalOpen(false)}
          folder={folder}
        />
        <RenameFolderModal
          isOpen={isRenameFolderModalOpen}
          handleClose={() => setIsRenameFolderModalOpen(false)}
          folder={folder}
        />
        <Menu position="bottom-end" shadow="md" width={200}>
          <Menu.Target>
            <Button
              className={styles.actions_button}
              leftIcon={<BiMenuAltRight />}
            >
              Actions
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Button
              leftIcon={<AiOutlinePlus />}
              color="gray"
              variant="default"
              className={styles.new_note_button}
            >
              Create Note
            </Button>
            <Button
              className={styles.delete_folder_button}
              color="gray"
              variant="default"
              leftIcon={<AiOutlineEdit />}
              onClick={() => setIsRenameFolderModalOpen(true)}
            >
              Rename
            </Button>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>

            <Button
              className={styles.delete_folder_button}
              color="red"
              variant="filled"
              leftIcon={<AiOutlineDelete />}
              onClick={() => setIsDeleteFolderModalOpen(true)}
            >
              Delete
            </Button>
          </Menu.Dropdown>
        </Menu>
      </>
    );
  };

  if (folder.notes.length === 0) {
    return (
      <NavLink label={folder.folder_name} childrenOffset={28}>
        <Alert
          className={styles.alert}
          title="Empty folder"
          color="blue"
          radius="md"
          icon={<AiOutlineInfoCircle />}
        >
          This folder is empty, start adding some notes!
        </Alert>
        {actionsButton()}
      </NavLink>
    );
  }

  return (
    <NavLink label={folder.folder_name} childrenOffset={28}>
      {actionsButton()}
      {folder.notes.map((note: INote) => {
        return <NoteItem key={note.id} note={note} />;
      })}
    </NavLink>
  );
};

export default FolderItem;
