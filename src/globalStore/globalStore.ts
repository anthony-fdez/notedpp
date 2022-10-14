import { IFolder } from "./../interfaces/IFolder";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "./interfaces/IUser";

export interface IGlobalStore {
  user: IUser;
  folders: IFolder[] | null;
  isLoadingFolders: boolean;
  setUser: (data: IUser) => void;
  setFolders: (data: IFolder[]) => void;
  setIsLoadingFolders: (isLoading: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist((set) => ({
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
      isLoadingFolders: false,
      setUser: (data: IUser) => {
        set({ user: data });
      },
      setFolders: (data: IFolder[]) => {
        set({ folders: data });
      },
      setIsLoadingFolders: (isLoading: boolean) => {
        set({ isLoadingFolders: isLoading });
      },
    })),
    {
      name: "global-store",
    }
  )
);
