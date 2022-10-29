import { Alert, Loader } from '@mantine/core';
import React from 'react';
import { INote } from '../../../interfaces/INote';

interface Props {
  note: string | undefined;
  noteData: INote | 'loading' | null;
  noteId: string | null;
  userId: string | null;
  folderId: string | null;
}

const CollaborationEditor = ({
  note,
  noteId,
  userId,
  folderId,
  noteData,
}: Props) => {
  console.log(noteData);

  return (
    <div>
      <h1>Collaboration Editor</h1>
    </div>
  );
};

export default CollaborationEditor;
