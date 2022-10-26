import { ActionIcon, Button, Menu, NavLink } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import { BsFolderSymlink } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { getNoteTitle } from '../../../../../functions/getNoteTitle';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { INote } from '../../../../../interfaces/INote';
import DeleteNoteModal from '../modals/deleteNoteModal/deleteNoteModal';
import MoveNoteModal from '../modals/moveNote/moveNoteModal';
import styles from './noteItem.module.css';

interface Props {
  note: INote;
}

const NoteItem = ({ note }: Props) => {
  const globalStore = useGlobalStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoveNoteModalOpen, setIsMoveNoteModalOpen] = useState(false);
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);

  const ref = useClickOutside(() => setIsMenuOpen(false));

  return (
    <div className={styles.note_item_container} ref={ref} key={note.id}>
      <MoveNoteModal
        note={note}
        isOpen={isMoveNoteModalOpen}
        handleClose={() => setIsMoveNoteModalOpen(false)}
      />
      <DeleteNoteModal
        note={note}
        isOpen={isDeleteNoteModalOpen}
        handleClose={() => setIsDeleteNoteModalOpen(false)}
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
          label={getNoteTitle({ note: note.note })}
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
            className={styles.note_button}
            color='red'
            leftIcon={<IconTrash size={14} />}
            onClick={() => setIsDeleteNoteModalOpen(true)}
          >
            Delete Note
          </Button>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default NoteItem;
