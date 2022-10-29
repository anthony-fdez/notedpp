import { Alert, Button, Input, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import styles from '../modals.module.css';
import { IFolder } from '../../../../../../interfaces/IFolder';
import { deleteFolder } from '../../../../../../api/notes/delete/deleteFolder';

interface Props {
  folder: IFolder;
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteFolderModal = ({
  isOpen,
  handleClose,
  folder,
}: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingDeletingFolder, setIsLoadingDeletingFolder] = useState(false);
  const [confirmFolderName, setConfirmFolderName] = useState('');

  const handleDeleteFolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingDeletingFolder(true);

    await deleteFolder({
      folder_id: folder.id,
      globalStore,
    });

    handleClose();
    setIsLoadingDeletingFolder(false);
  };

  return (
    <Modal opened={isOpen} onClose={handleClose} title='Delete Folder'>
      <form onSubmit={(e) => handleDeleteFolder(e)}>
        <Alert variant='filled' title='Be careful' color='red'>
          This action is irreversible, and all you notes inside this folder will
          be deleted as well.
        </Alert>
        <Alert color='red' className={styles.confirm_alert}>
          Type <strong>&apos;{folder.folder_name}&apos;</strong> to confirm
          deleting the folder.
        </Alert>
        <Input
          onChange={(e) => setConfirmFolderName(e.target.value)}
          placeholder='Confirm folder name'
        />
        <div className={styles.footer_container}>
          <Button
            disabled={confirmFolderName !== folder.folder_name}
            loaderPosition='left'
            loading={isLoadingDeletingFolder}
            color='red'
            variant='outline'
            type='submit'
          >
            Delete Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteFolderModal;
