export interface INote {
  id: string;
  user_id: string;
  note: string;
  note_archive_text?: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}
