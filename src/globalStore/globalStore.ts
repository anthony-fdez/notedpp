import Axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IFolder } from './../interfaces/IFolder';
import { INote } from './../interfaces/INote';
import { IFolderDashboard } from './interfaces/IFolderDashboard';
import { IUser } from './interfaces/IUser';

export interface IGlobalStore {
  theme: 'dark' | 'light';
  user: IUser | null;
  selectedNote: INote | null;
  isFolderDashboard: IFolderDashboard | null;
  folders: IFolder[] | null;
  isLoadingFolders: boolean;
  isFullLoader: boolean;
  isMobileMenuOpen: boolean;
  collaborationImportedNote: string | null;
  setUser: (data: IUser | null) => void;
  setSelectedNote: (note: INote | null) => void;
  setFolders: (data: IFolder[] | null) => void;
  setIsLoadingFolders: (isLoading: boolean) => void;
  setIsFullLoader: (isFullLoading: boolean) => void;
  updateFolders: () => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setCollaborationImportedNote: (note: string | null) => void;
  setIsFolderDashboard: (data: IFolderDashboard | null) => void;
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
      isFolderDashboard: null,
      isLoadingFolders: true,
      isFullLoader: false,
      isMobileMenuOpen: false,
      collaborationImportedNote: null,
      setUser: (data: IUser | null) => {
        set({ user: data });
      },
      setFolders: (data: IFolder[] | null) => {
        set({ folders: data });
      },
      setIsLoadingFolders: (isLoading: boolean) => {
        set({ isLoadingFolders: isLoading });
      },
      setIsFullLoader: (isFullLoading: boolean) => {
        set({ isFullLoader: isFullLoading });
      },
      setSelectedNote: (noteId: INote | null) => {
        set({ selectedNote: noteId });
      },
      updateFolders: () => {
        set({ isLoadingFolders: true });

        Axios.get(`${import.meta.env.VITE_BASE_URL}notes/get-all-folders/`, {
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
      setCollaborationImportedNote: (note: string | null) => {
        set({ collaborationImportedNote: note });
      },
      setIsFolderDashboard(data: IFolderDashboard | null) {
        set({ isFolderDashboard: data });
      },
    })),
    {
      name: 'global-store',
    }
  )
);
