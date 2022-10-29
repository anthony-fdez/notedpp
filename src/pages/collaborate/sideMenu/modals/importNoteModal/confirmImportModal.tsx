import { Alert, Button, Modal } from '@mantine/core';
import React from 'react';
import styles from '../modals.module.css';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ConfirmImportNoteModal = ({
  isOpen,
  handleClose,
}: Props): JSX.Element => {
  return (
    <Modal
      overlayBlur={5}
      opened={isOpen}
      onClose={handleClose}
      title='Import note'
    >
      <div>
        <Alert title='Import note'>
          You are about to override the current collaboration editor and import
          your note, do you want to continue?
        </Alert>

        <div className={styles.footer_container}>
          <Button style={{ marginRight: '10px' }} variant='light'>
            Cancel
          </Button>
          <Button loaderPosition='left' type='submit'>
            Yes, import note
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmImportNoteModal;
