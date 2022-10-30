import { Alert, Button, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { deleteNote } from '../../../../../../api/notes/delete/deleteNote';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import { INote } from '../../../../../../interfaces/INote';
import styles from '../modals.module.css';

interface Props {
  note: INote;
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteNoteModal = ({ isOpen, handleClose, note }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingDeletingNote, setIsLoadingDeletingNote] = useState(false);

  const handleDeleteNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingDeletingNote(true);

    await deleteNote({ globalStore, note_id: note.id });

    setIsLoadingDeletingNote(false);
    handleClose();
  };

  return (
    <Modal
      overlayBlur={5}
      opened={isOpen}
      onClose={handleClose}
      title='Delete note'
    >
      <Alert color='red' title='Are you sure?'>
        Your note will be gone forever
      </Alert>
      <form onSubmit={(e) => handleDeleteNote(e)}>
        <div className={styles.footer_container}>
          <Button
            color='red'
            loaderPosition='left'
            loading={isLoadingDeletingNote}
            type='submit'
          >
            Delete Note
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteNoteModal;
