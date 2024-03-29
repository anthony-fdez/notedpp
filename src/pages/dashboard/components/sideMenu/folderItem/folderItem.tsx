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
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { useClickOutside } from '@mantine/hooks';
import { createNote } from '../../../../../api/notes/create/createNote';
import { BsColumns } from 'react-icons/bs';

interface Props {
  folder: IFolder;
  activeFolder: string | null;
  setActiveFolder: React.Dispatch<React.SetStateAction<string | null>>;
}

const FolderItem = ({
  folder,
  activeFolder,
  setActiveFolder,
}: Props): JSX.Element | null => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useClickOutside(() => setIsMenuOpen(false));

  const globalStore = useGlobalStore();

  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);

  const handleCreateNote = async () => {
    globalStore.setIsFullLoader(true);

    await createNote({
      globalStore,
      note: '<h1></h1>', // For our editor this is the equivalent of empty strings. Since we force a header for every note
      folder_name: folder.folder_name,
    });

    setIsMenuOpen(false);

    globalStore.setIsFullLoader(false);
  };

  const getNotesThatAreNotCompleted = () => {
    let notCompletedNotes = 0;

    folder.notes.map((note: INote) => {
      if (note.status !== 'done') {
        notCompletedNotes++;
      }
    });

    return notCompletedNotes;
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
            <Menu.Label>Folder</Menu.Label>
            <Menu.Item onClick={handleCreateNote} icon={<AiOutlinePlus />}>
              Create Note
            </Menu.Item>
            <Menu.Item
              onClick={() => setIsRenameFolderModalOpen(true)}
              icon={<AiOutlineEdit />}
            >
              Rename Folder
            </Menu.Item>

            <Menu.Divider />
            <Menu.Label>Layout</Menu.Label>
            <Menu.Item
              icon={<BsColumns />}
              onClick={() => {
                if (globalStore.isFolderDashboard) {
                  globalStore.setIsFolderDashboard(null);
                } else {
                  globalStore.setIsFolderDashboard({
                    isOpen: true,
                    folder,
                  });
                }
              }}
            >
              Dashboard View
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              icon={<AiOutlineDelete />}
              color='red'
              onClick={() => setIsDeleteFolderModalOpen(true)}
            >
              Delete Folder
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    );
  };

  if (getNotesThatAreNotCompleted() === 0) {
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
        description={`${getNotesThatAreNotCompleted()} notes.`}
        label={folder.folder_name}
        childrenOffset={28}
        noWrap={true}
        opened={activeFolder === folder.id}
        onClick={() => {
          if (activeFolder === folder.id) {
            return setActiveFolder(null);
          }

          setActiveFolder(folder.id);
        }}
      >
        {actionsButton()}
        {folder.notes.map((note: INote) => {
          if (note.status !== 'done') {
            return <NoteItem key={note.id} note={note} />;
          }
        })}
        <br></br>
      </NavLink>
    </div>
  );
};

export default FolderItem;
