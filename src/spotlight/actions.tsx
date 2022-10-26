import { LogoutOptions } from '@auth0/auth0-react';
import type { SpotlightAction } from '@mantine/spotlight';
import moment from 'moment';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { createNote } from '../api/notes/create/createNote';
import { handleLogout } from '../components/auth/logoutButton/logoutButton';
import { getNoteTitle } from '../functions/getNoteTitle';
import { IGlobalStore } from '../globalStore/globalStore';
import { IFolder } from '../interfaces/IFolder';
import { INote } from '../interfaces/INote';

interface Props {
  globalStore: IGlobalStore;
  logout: (options?: LogoutOptions | undefined) => void;
  isAuthenticated: boolean;
}

export const spotlightActions = ({
  globalStore,
  logout,
  isAuthenticated,
}: Props): SpotlightAction[] => {
  const actions: SpotlightAction[] = [];

  if (isAuthenticated) {
    actions.push({
      title: 'Create new quick note',
      description: 'Create a quick note inside your quick notes folder',
      onTrigger: async () => {
        globalStore.setIsFullLoader(true);
        await createNote({
          globalStore,
          note: '<h1></h1>',
        });
        globalStore.setIsFullLoader(false);
      },
      group: 'Actions',
      icon: <AiOutlinePlus />,
    });

    actions.push({
      title: 'Logout',
      description: 'Log out of Noted++',
      onTrigger: () => handleLogout({ globalStore, logout }),
      group: 'Actions',
      icon: <CiLogout />,
    });
  }

  if (globalStore.folders) {
    globalStore.folders.forEach((folder: IFolder) => {
      folder.notes.forEach((note: INote) => {
        actions.push({
          title: getNoteTitle({ note: note.note }),
          description: `Folder: ${folder.folder_name} - last edited ${moment(
            note.updatedAt
          ).fromNow()}`,
          onTrigger: () => globalStore.setSelectedNote(note),
          group: 'Notes',
        });
      });
    });
  }

  return actions;
};
