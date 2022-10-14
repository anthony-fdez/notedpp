import { Alert, Button, Drawer } from '@mantine/core';
import React, { useState } from 'react';
import { IFolder } from '../../../../interfaces/IFolder';
import SideMenuSkeleton from '../sideMenuSkeleton/sideMenuSkeleton';
import FolderItem from './folderItem/folderItem';
import styles from './sideMenu.module.css';

import { MdOutlineCreate } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import NewFolderModal from './modals/newFolderModal/newFolderModal';

import Axios from 'axios';
import { showNotification } from '@mantine/notifications';
interface Props {
  isLoadingNotes: boolean;
}

const SideMenu = ({ isLoadingNotes }: Props): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isLoadingAddingQuickNote, setIsLoadingAddingQuickNote] =
    useState(false);

  const handleAddQuickNote = () => {
    setIsLoadingAddingQuickNote(true);

    Axios.post(
      'http://localhost:3001/notes/new-note',
      {
        note: 'Delete this to start your note',
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user?.token}`,
        },
      }
    )
      .then((response) => {
        showNotification({
          title: 'Quick note created',
          message: 'Your quick note was added to the quick notes folder',
          color: 'blue',
        });

        globalStore.updateFolders();
        globalStore.setSelectedNote(response.data.note);
      })
      .catch((e) => {
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
        setIsLoadingAddingQuickNote(false);
      });
  };

  const folderAndNotesButtons = () => {
    return (
      <>
        <Button
          leftIcon={<AiOutlinePlus />}
          className={styles.new_folder_button}
          onClick={handleAddQuickNote}
          loading={isLoadingAddingQuickNote}
        >
          Add Quick Note
        </Button>
        <Button
          leftIcon={<MdOutlineCreate />}
          className={styles.new_folder_button}
          onClick={() => {
            setIsNewFolderModalOpen(true);
            globalStore.setIsMobileMenuOpen(false);
          }}
          variant='light'
        >
          Create new folder
        </Button>
      </>
    );
  };

  const renderFolderList = () => {
    if (!globalStore.folders) {
      return (
        <Alert color='red' title='Hmm, something failed...'>
          There was an error getting your notes, try again later.
        </Alert>
      );
    }

    if (globalStore.folders.length === 0) {
      return (
        <Alert color='blue' title='So empty...'>
          You don&apos;t have any notes yet. Start by creating a folder!
        </Alert>
      );
    }

    return globalStore.folders.map((folder: IFolder) => {
      return <FolderItem key={folder.id} folder={folder} />;
    });
  };

  if (isLoadingNotes)
    return (
      <div className={styles.container}>
        {folderAndNotesButtons()}
        <SideMenuSkeleton />
      </div>
    );

  return (
    <>
      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        handleClose={() => setIsNewFolderModalOpen(false)}
      />

      <div className={styles.mobile_menu}>
        <Drawer
          opened={globalStore.isMobileMenuOpen}
          onClose={() => globalStore.setIsMobileMenuOpen(false)}
          title='Noted++'
          padding='xl'
          size='lg'
        >
          {folderAndNotesButtons()}
          {renderFolderList()}
        </Drawer>
      </div>
      <div className={styles.desktop_menu}>
        <div className={styles.container}>
          {folderAndNotesButtons()}
          {renderFolderList()}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
