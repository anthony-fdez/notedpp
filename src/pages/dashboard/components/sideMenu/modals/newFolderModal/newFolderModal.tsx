import { Button, Input, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import styles from '../modals.module.css';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { createFolder } from '../../../../../../api/notes/create/createFolder';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const NewFolderModal = ({ isOpen, handleClose }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingCreatingFolder, setIsLoadingCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCreatingFolder(true);

    await createFolder({ globalStore, folder_name: folderName });

    setIsLoadingCreatingFolder(false);
    handleClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title='Create new folder'
    >
      <form onSubmit={(e) => handleCreateFolder(e)}>
        <Input
          onChange={(e: {
            target: { value: React.SetStateAction<string> };
          }) => {
            setFolderName(e.target.value);
          }}
          placeholder='Folder Name'
          required={true}
        />
        <div className={styles.footer_container}>
          <Button
            loaderPosition='left'
            loading={isLoadingCreatingFolder}
            type='submit'
          >
            Create Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewFolderModal;
