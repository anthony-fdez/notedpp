import { Button, Input, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import styles from '../modals.module.css';
import { IFolder } from '../../../../../../interfaces/IFolder';
import { renameFolder } from '../../../../../../api/notes/update/renameFolder';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  folder: IFolder;
}

const RenameFolderModal = ({
  isOpen,
  handleClose,
  folder,
}: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingCreatingFolder, setIsLoadingCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCreatingFolder(true);

    await renameFolder({
      globalStore,
      new_folder_name: newFolderName,
      folder_name: folder.folder_name,
    });

    setIsLoadingCreatingFolder(false);
    handleClose();
  };

  return (
    <Modal
      overlayBlur={5}
      opened={isOpen}
      onClose={handleClose}
      title='Rename Folder'
    >
      <form onSubmit={(e) => handleCreateFolder(e)}>
        <Input
          onChange={(e: any) => {
            setNewFolderName(e.target.value);
          }}
          placeholder='New Folder Name'
          required={true}
          defaultValue={folder.folder_name}
        />
        <div className={styles.footer_container}>
          <Button
            loaderPosition='left'
            loading={isLoadingCreatingFolder}
            type='submit'
          >
            Rename Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RenameFolderModal;
