import { Alert, NavLink } from "@mantine/core";
import React from "react";
import { IFolder } from "../../../../../interfaces/IFolder";
import { INote } from "../../../../../interfaces/INote";
import NoteItem from "../noteItem/noteItem";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./folderItem.module.css";

interface Props {
  folder: IFolder;
}

const FolderItem = ({ folder }: Props): JSX.Element | null => {
  if (!folder) return null;

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
      </NavLink>
    );
  }

  return (
    <NavLink label={folder.folder_name} childrenOffset={28}>
      {folder.notes.map((note: INote) => {
        return <NoteItem key={note.id} note={note} />;
      })}
    </NavLink>
  );
};

export default FolderItem;
