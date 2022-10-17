import { Button, Input, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import styles from '../modals.module.css';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const NewFolderModal = ({ isOpen, handleClose }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingCreatingFolder, setIsLoadingCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCreatingFolder(true);

    Axios.post(
      'http://localhost:3001/notes/new-folder',
      {
        folder_name: folderName,
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user?.token || ''}`,
        },
      }
    )
      .then(() => {
        showNotification({
          title: 'Folder Deleted',
          message: 'Your folder was deleted successfully',
          color: 'blue',
        });

        globalStore.updateFolders();

        handleClose();
      })
      .catch((e): void => {
        try {
          if (e.response.data.message) {
            showNotification({
              title: 'Error',
              message: e.response.data.message,
              color: 'red',
            });
          }
        } catch (e) {
          showNotification({
            title: 'Error',
            message: 'Looks like our servers are down, try again later.',
            color: 'red',
          });
        }
      })
      .finally(() => {
        setIsLoadingCreatingFolder(false);
      });
  };

  return (
    <Modal
      overlayBlur={3}
      opened={isOpen}
      onClose={handleClose}
      title='Create new folder'
    >
      <form onSubmit={(e): void => handleCreateFolder(e)}>
        <Input
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
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
