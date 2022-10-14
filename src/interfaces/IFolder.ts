import { INote } from "./INote";

export interface IFolder {
  id: string;
  folder_name: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  notes: INote[];
}
