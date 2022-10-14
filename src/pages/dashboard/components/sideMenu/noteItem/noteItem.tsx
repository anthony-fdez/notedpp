import { ActionIcon, Button, Menu, NavLink } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";
import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useGlobalStore } from "../../../../../globalStore/globalStore";
import { INote } from "../../../../../interfaces/INote";
import styles from "./noteItem.module.css";
import Axios from "axios";
import { showNotification } from "@mantine/notifications";

interface Props {
  note: INote;
}

const NoteItem = ({ note }: Props) => {
  const globalStore = useGlobalStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingDeletingNote, setIsLoadingDeletingNote] = useState(false);

  const ref = useClickOutside(() => setIsMenuOpen(false));

  const handleDeleteNote = () => {
    setIsLoadingDeletingNote(true);

    Axios.post(
      "http://localhost:3001/notes/delete-note",
      {
        note_id: note.id,
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user.token}`,
        },
      }
    )
      .then(() => {
        showNotification({
          title: "Note Deleted",
          message: "Your note was deleted successfully",
          color: "blue",
        });

        if (
          globalStore.selectedNote &&
          globalStore.selectedNote.id === note.id
        ) {
          globalStore.setSelectedNote(null);
        }

        globalStore.updateFolders();

        setIsMenuOpen(false);
      })
      .catch((e) => {
        try {
          if (e.response.data.message) {
            showNotification({
              title: "Error",
              message: e.response.data.message,
              color: "red",
            });
          }
        } catch (e) {
          showNotification({
            title: "Error",
            message: "Looks like our servers are down, try again later.",
            color: "red",
          });
        }
      })
      .finally(() => {
        setIsLoadingDeletingNote(false);
      });
  };

  return (
    <div className={styles.note_item_container} ref={ref} key={note.id}>
      <Menu
        opened={isMenuOpen}
        shadow="md"
        width={200}
        position="bottom-end"
        closeOnItemClick={false}
      >
        <NavLink
          onClick={() => globalStore.setSelectedNote(note)}
          active={note.id === globalStore.selectedNote?.id}
          label={note.note}
          rightSection={
            note.id === globalStore.selectedNote?.id && (
              <>
                <Menu.Target>
                  <ActionIcon onClick={() => setIsMenuOpen(true)}>
                    <FiMoreHorizontal />
                  </ActionIcon>
                </Menu.Target>
              </>
            )
          }
        />
        <Menu.Dropdown>
          <Menu.Label>Note</Menu.Label>
          <Menu.Item>
            <Button
              loading={isLoadingDeletingNote}
              className={styles.delete_note_button}
              color="red"
              leftIcon={<IconTrash size={14} />}
              onClick={handleDeleteNote}
            >
              Delete Note
            </Button>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default NoteItem;
