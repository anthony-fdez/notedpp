import { Alert, Button, Drawer, Loader } from '@mantine/core';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineCreate } from 'react-icons/md';
import { createNote } from '../../../../api/notes/create/createNote';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { IFolder } from '../../../../interfaces/IFolder';
import FolderItem from './folderItem/folderItem';
import NewFolderModal from './modals/newFolderModal/newFolderModal';
import styles from './sideMenu.module.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const SideMenu = (): JSX.Element | null => {
  const globalStore = useGlobalStore();
  const navigate = useNavigate();

  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isLoadingAddingQuickNote, setIsLoadingAddingQuickNote] =
    useState(false);

  const handleCreateNote = async () => {
    setIsLoadingAddingQuickNote(true);

    await createNote({
      globalStore,
      note: '<h1></h1>',
    });

    setIsLoadingAddingQuickNote(false);
  };

  const handleCollaborate = () => {
    const randomString = (Math.random() + 1).toString(36).substring(2);

    navigate(`/collaborate/${randomString}`);
  };

  const folderAndNotesButtons = () => {
    return (
      <>
        <Button
          leftIcon={<AiOutlinePlus />}
          className={styles.new_folder_button}
          onClick={handleCreateNote}
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
        <Button
          leftIcon={<BsFillPeopleFill />}
          className={styles.new_folder_button}
          onClick={handleCollaborate}
          variant='light'
        >
          Collaborate
        </Button>
      </>
    );
  };

  const renderFolderList = () => {
    if (!globalStore.folders) {
      return (
        <Alert icon={<Loader />} color='blue' title='Hold on tight...'>
          Your notes are getting ready
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

  return (
    <>
      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        handleClose={() => setIsNewFolderModalOpen(false)}
      />

      <div className={styles.mobile_menu}>
        <Drawer
          overlayBlur={5}
          className={styles.drawer}
          lockScroll={false}
          opened={globalStore.isMobileMenuOpen}
          onClose={() => globalStore.setIsMobileMenuOpen(false)}
          title='Noted++'
          padding='xl'
          size='xl'
        >
          {folderAndNotesButtons()}
          {renderFolderList()}
        </Drawer>
      </div>
      <div className={styles.desktop_menu}>
        <div
          style={{
            borderRight: `1px solid ${
              globalStore.theme === 'dark'
                ? 'rgb(80,80,80)'
                : 'rgb(230,230,230)'
            }`,
          }}
          className={styles.container}
        >
          {folderAndNotesButtons()}
          <div>{renderFolderList()}</div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
