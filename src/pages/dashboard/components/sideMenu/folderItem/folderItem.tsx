import { Alert, Button, NavLink } from "@mantine/core";
import React from "react";
import { IFolder } from "../../../../../interfaces/IFolder";
import { INote } from "../../../../../interfaces/INote";
import NoteItem from "../noteItem/noteItem";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./folderItem.module.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

interface Props {
  folder: IFolder;
}

const FolderItem = ({ folder }: Props): JSX.Element | null => {
  if (!folder) return null;

  const addNewNoteButton = () => {
    return (
      <Button
        leftIcon={<AiOutlinePlus />}
        variant="light"
        className={styles.new_note_button}
      >
        Create Note
      </Button>
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
        {addNewNoteButton()}
      </NavLink>
    );
  }

  return (
    <NavLink label={folder.folder_name} childrenOffset={28}>
      {addNewNoteButton()}
      {folder.notes.map((note: INote) => {
        return <NoteItem key={note.id} note={note} />;
      })}
      <div className={styles.folder_button_container}>
        <Button
          className={styles.delete_folder_button}
          color="blue"
          variant="light"
          leftIcon={<AiOutlineEdit />}
        >
          Rename
        </Button>
        <Button
          className={styles.delete_folder_button}
          color="red"
          variant="light"
          leftIcon={<AiOutlineDelete />}
        >
          Delete
        </Button>
      </div>
    </NavLink>
  );
};

export default FolderItem;
