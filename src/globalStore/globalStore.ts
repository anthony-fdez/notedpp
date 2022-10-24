import { INote } from './../interfaces/INote';
import { IFolder } from './../interfaces/IFolder';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from './interfaces/IUser';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';
export interface IGlobalStore {
  theme: 'dark' | 'light';
  user: IUser | null;
  selectedNote: INote | null;
  folders: IFolder[] | null;
  isLoadingFolders: boolean;
  isMobileMenuOpen: boolean;
  setUser: (data: IUser) => void;
  setSelectedNote: (note: INote | null) => void;
  setFolders: (data: IFolder[] | null) => void;
  setIsLoadingFolders: (isLoading: boolean) => void;
  updateFolders: () => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist((set, get) => ({
      theme: 'light',
      user: {
        email: null,
        email_verified: null,
        family_name: null,
        given_name: null,
        name: null,
        picture: null,
        token: null,
      },
      folders: null,
      selectedNote: null,
      isLoadingFolders: true,
      isMobileMenuOpen: false,
      setUser: (data: IUser | null) => {
        set({ user: data });
      },
      setFolders: (data: IFolder[] | null) => {
        set({ folders: data });
      },
      setIsLoadingFolders: (isLoading: boolean) => {
        set({ isLoadingFolders: isLoading });
      },
      setSelectedNote: (noteId: INote | null) => {
        set({ selectedNote: noteId });
      },
      updateFolders: () => {
        set({ isLoadingFolders: true });

        Axios.get(`${import.meta.env.VITE_BASE_URL}/notes/get-all-folders`, {
          headers: {
            Authorization: `Bearer ${get().user?.token || ''}`,
          },
        })
          .then((response) => {
            set({ folders: response.data.folders });
          })
          .catch((error: unknown) => {
            if (error) set({ folders: null });
          })
          .finally(() => {
            set({ isLoadingFolders: false });
          });
      },

      setIsMobileMenuOpen: (isOpen: boolean) => {
        set({ isMobileMenuOpen: isOpen });
      },
      setTheme: (theme: 'dark' | 'light') => {
        set({ theme });
      },
    })),
    {
      name: 'global-store',
    }
  )
);
