import { ActionIcon, Button, Menu, NavLink } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import { BsFolderSymlink } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { deleteNote } from '../../../../../api/notes/delete/deleteNote';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { INote } from '../../../../../interfaces/INote';
import MoveNoteModal from '../modals/moveNote/moveNoteModal';
import styles from './noteItem.module.css';

interface Props {
  note: INote;
}

const NoteItem = ({ note }: Props) => {
  const globalStore = useGlobalStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingDeletingNote, setIsLoadingDeletingNote] = useState(false);

  const [isMoveNoteModalOpen, setIsMoveNoteModalOpen] = useState(false);

  const ref = useClickOutside(() => setIsMenuOpen(false));

  const handleDeleteNote = async () => {
    setIsLoadingDeletingNote(true);

    await deleteNote({ globalStore, note_id: note.id });

    setIsLoadingDeletingNote(false);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.note_item_container} ref={ref} key={note.id}>
      <MoveNoteModal
        note={note}
        isOpen={isMoveNoteModalOpen}
        handleClose={() => setIsMoveNoteModalOpen(false)}
      />
      <Menu
        opened={isMenuOpen}
        shadow='md'
        width={200}
        position='bottom-end'
        closeOnItemClick={false}
      >
        <NavLink
          variant='light'
          noWrap={true}
          onClick={() => {
            globalStore.setSelectedNote(note);
          }}
          active={note.id === globalStore.selectedNote?.id}
          label={note.note}
          rightSection={
            <>
              <Menu.Target>
                <ActionIcon onClick={() => setIsMenuOpen(true)}>
                  <FiMoreHorizontal />
                </ActionIcon>
              </Menu.Target>
            </>
          }
        />
        <Menu.Dropdown>
          <Menu.Label>Note</Menu.Label>
          <Button
            leftIcon={<BsFolderSymlink />}
            color='gray'
            variant='default'
            className={styles.note_button}
            onClick={() => setIsMoveNoteModalOpen(true)}
          >
            Move Note
          </Button>

          <Menu.Label>Danger zone</Menu.Label>

          <Button
            loading={isLoadingDeletingNote}
            className={styles.note_button}
            color='red'
            leftIcon={<IconTrash size={14} />}
            onClick={handleDeleteNote}
          >
            Delete Note
          </Button>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default NoteItem;
