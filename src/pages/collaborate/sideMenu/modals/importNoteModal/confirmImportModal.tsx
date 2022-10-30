import { Alert, Button, Modal } from '@mantine/core';
import React from 'react';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import styles from '../modals.module.css';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleCloseParentModal: () => void;
  note: string | null;
}

const ConfirmImportNoteModal = ({
  isOpen,
  handleClose,
  handleCloseParentModal,
  note,
}: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const handleConfirmImportNote = () => {
    globalStore.setCollaborationImportedNote(note);

    handleClose();
    handleCloseParentModal();
  };

  const getModalContent = () => {
    if (!note) {
      return (
        <div>
          <Alert color='red' title='Error'>
            There was an error, and this in an unlikely error to happen. Try
            again and that should fix it!
          </Alert>

          <div className={styles.footer_container}>
            <Button onClick={handleClose} type='submit'>
              Aight
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Alert title='Import note'>
          You are about to override the current collaboration editor and import
          your note, do you want to continue?
        </Alert>

        <div className={styles.footer_container}>
          <Button
            onClick={handleClose}
            style={{ marginRight: '10px' }}
            variant='light'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmImportNote}
            loaderPosition='left'
            type='submit'
          >
            Yes, import note
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      overlayBlur={5}
      opened={isOpen}
      onClose={handleClose}
      title='Import note'
    >
      {getModalContent()}
    </Modal>
  );
};

export default ConfirmImportNoteModal;
