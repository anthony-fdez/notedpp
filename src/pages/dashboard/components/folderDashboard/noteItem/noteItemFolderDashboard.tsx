import React from 'react';
import { getNoteTitle } from '../../../../../functions/getNoteTitle';
import { INote } from '../../../../../interfaces/INote';

interface Props {
  note: INote;
}

const NoteItemFolderDashboard = ({ note }: Props) => {
  return (
    <div>
      <p>{getNoteTitle({ note: note.note })}</p>
    </div>
  );
};

export default NoteItemFolderDashboard;
