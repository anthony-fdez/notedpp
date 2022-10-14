import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "./interfaces/IUser";

export interface IGlobalStore {
  user: IUser;
  setUser: (data: IUser) => void;
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
      setUser: (data: IUser) => {
        set({ user: data });
      },
    })),
    {
      name: "global-store",
    }
  )
);
