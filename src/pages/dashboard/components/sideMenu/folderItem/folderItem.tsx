import { Alert, Button, Menu, NavLink } from '@mantine/core';
import React, { useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BiMenuAltRight } from 'react-icons/bi';
import { IFolder } from '../../../../../interfaces/IFolder';
import { INote } from '../../../../../interfaces/INote';
import DeleteFolderModal from '../modals/deleteFolderModal/deleteFolderModal';
import RenameFolderModal from '../modals/renameFolderModal/renameFolderModal';
import NoteItem from '../noteItem/noteItem';
import styles from './folderItem.module.css';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { useClickOutside } from '@mantine/hooks';

interface Props {
  folder: IFolder;
}

const FolderItem = ({ folder }: Props): JSX.Element | null => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useClickOutside(() => setIsMenuOpen(false));

  const globalStore = useGlobalStore();

  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);
  const [isLoadingCreatingNote, setIsLoadingCreatingNote] = useState(false);

  const handleCreateNote = () => {
    setIsLoadingCreatingNote(true);

    Axios.post(
      'http://localhost:3001/notes/new-note',
      {
        note: 'Delete this to start your note',
        folder_name: folder.folder_name,
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user?.token || ''}`,
        },
      }
    )
      .then((response) => {
        showNotification({
          title: 'Note created',
          message: `Your quick note was added to folder '${folder.folder_name}'`,
          color: 'blue',
        });

        globalStore.updateFolders();
        setIsMenuOpen(false);

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
        setIsLoadingCreatingNote(false);
      });
  };

  if (!folder) return null;

  const actionsButton = () => {
    return (
      <>
        <DeleteFolderModal
          isOpen={isDeleteFolderModalOpen}
          handleClose={() => setIsDeleteFolderModalOpen(false)}
          folder={folder}
        />
        <RenameFolderModal
          isOpen={isRenameFolderModalOpen}
          handleClose={() => setIsRenameFolderModalOpen(false)}
          folder={folder}
        />
        <Menu
          closeOnItemClick={false}
          opened={isMenuOpen}
          position='bottom-end'
          shadow='md'
          width={200}
        >
          <Menu.Target>
            <Button
              onClick={() => setIsMenuOpen(true)}
              className={styles.actions_button}
              leftIcon={<BiMenuAltRight />}
            >
              Actions
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Button
              leftIcon={<AiOutlinePlus />}
              color='gray'
              variant='default'
              className={styles.new_note_button}
              loading={isLoadingCreatingNote}
              onClick={handleCreateNote}
            >
              Create Note
            </Button>
            <Button
              className={styles.delete_folder_button}
              color='gray'
              variant='default'
              leftIcon={<AiOutlineEdit />}
              onClick={() => setIsRenameFolderModalOpen(true)}
            >
              Rename
            </Button>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>

            <Button
              className={styles.delete_folder_button}
              color='red'
              variant='filled'
              leftIcon={<AiOutlineDelete />}
              onClick={() => setIsDeleteFolderModalOpen(true)}
            >
              Delete
            </Button>
          </Menu.Dropdown>
        </Menu>
      </>
    );
  };

  if (folder.notes.length === 0) {
    return (
      <div ref={ref}>
        <NavLink
          description='Empty Folder'
          label={folder.folder_name}
          childrenOffset={28}
          noWrap={true}
        >
          <Alert
            className={styles.alert}
            title='Empty folder'
            color='blue'
            radius='md'
            icon={<AiOutlineInfoCircle />}
          >
            This folder is empty, start adding some notes!
          </Alert>
          {actionsButton()}
        </NavLink>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <NavLink
        description={`${folder.notes.length} notes.`}
        label={folder.folder_name}
        childrenOffset={28}
        noWrap={true}
      >
        {actionsButton()}
        {folder.notes.map((note: INote) => {
          return <NoteItem key={note.id} note={note} />;
        })}
      </NavLink>
    </div>
  );
};

export default FolderItem;
