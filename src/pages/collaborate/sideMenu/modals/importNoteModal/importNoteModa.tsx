import { Accordion, Alert, Button, Input, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { IFolder } from '../../../../../interfaces/IFolder';

import styles from '../modals.module.css';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ImportNoteModal = ({ isOpen, handleClose }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const renderFoldersAndNotes = () => {
    if (!globalStore.folders) return null;

    return (
      <div>
        <Accordion defaultValue='customization'>
          {globalStore.folders.map((folder: IFolder) => {
            return (
              <Accordion.Item key={folder.id} value='customization'>
                <Accordion.Control>{folder.folder_name}</Accordion.Control>
                <Accordion.Panel></Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    );
  };

  return (
    <Modal opened={isOpen} onClose={handleClose} title='Import note'>
      <div>
        <Alert title='Override current editor'>
          Please be aware that importing one of your notes will override all the
          contents in the current collaboration session.
        </Alert>
        {renderFoldersAndNotes()}
        <div className={styles.footer_container}>
          <Button loaderPosition='left' type='submit'>
            Import Note
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportNoteModal;
