import React from 'react';
import { IGlobalStore } from '../globalStore/globalStore';
import type { SpotlightAction } from '@mantine/spotlight';
import { handleLogout } from '../components/auth/logoutButton/logoutButton';
import { LogoutOptions } from '@auth0/auth0-react';
import { IFolder } from '../interfaces/IFolder';
import { INote } from '../interfaces/INote';
import { getNoteTitle } from '../functions/getNoteTitle';
import moment from 'moment';
import { createNote } from '../api/notes/create/createNote';
import { CiLogout } from 'react-icons/ci';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';

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
  const navigate = useNavigate();
  const actions: SpotlightAction[] = [];

  if (isAuthenticated) {
    actions.push(
      {
        title: 'Create new quick note',
        description: 'Create a quick note inside your quick notes folder',
        onTrigger: async () => {
          globalStore.setIsFullLoader(true);

          await createNote({
            globalStore,
            note: '<h1></h1>',
          });

          globalStore.setIsFullLoader(false);

          return navigate('/dashboard');
        },
        group: 'Actions',
        icon: <AiOutlinePlus />,
      },
      {
        title: 'Collaborate',
        description: 'Start a collaboration session',
        onTrigger: () => {
          const randomString = (Math.random() + 1).toString(36).substring(2);

          navigate(`/collaborate/${randomString}`);
        },
        group: 'Actions',
        icon: <BsFillPeopleFill />,
      },
      {
        title: 'Logout',
        description: 'Log out of Noted++',
        onTrigger: () => handleLogout({ globalStore, logout }),
        group: 'Actions',
        icon: <CiLogout />,
      }
    );
  }

  if (globalStore.folders) {
    globalStore.folders.forEach((folder: IFolder) => {
      folder.notes.forEach((note: INote) => {
        actions.push({
          title: getNoteTitle({ note: note.note }),
          description: `Folder: ${folder.folder_name} - last edited ${moment(
            note.updatedAt
          ).fromNow()}`,
          onTrigger: () => {
            globalStore.setSelectedNote(note);
            navigate('/dashboard');
          },
          group: 'Notes',
        });
      });
    });
  }

  return actions;
};
