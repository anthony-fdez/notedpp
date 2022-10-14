import { IFolder } from "./../interfaces/IFolder";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "./interfaces/IUser";
import Axios from "axios";
export interface IGlobalStore {
  user: IUser;
  folders: IFolder[] | null;
  isLoadingFolders: boolean;
  setUser: (data: IUser) => void;
  setFolders: (data: IFolder[]) => void;
  setIsLoadingFolders: (isLoading: boolean) => void;
  updateFolders: () => void;
}

export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist((set, get) => ({
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
      isLoadingFolders: true,
      setUser: (data: IUser) => {
        set({ user: data });
      },
      setFolders: (data: IFolder[]) => {
        set({ folders: data });
      },
      setIsLoadingFolders: (isLoading: boolean) => {
        set({ isLoadingFolders: isLoading });
      },
      updateFolders: () => {
        set({ isLoadingFolders: true });

        Axios.get("http://localhost:3001/notes/get-all-folders", {
          headers: {
            Authorization: `Bearer ${get().user.token}`,
          },
        })
          .then((response) => {
            set({ folders: response.data.folders });
          })
          .catch((error: unknown) => {
            set({ folders: null });
          })
          .finally(() => {
            set({ isLoadingFolders: false });
          });
      },
    })),
    {
      name: "global-store",
    }
  )
);
