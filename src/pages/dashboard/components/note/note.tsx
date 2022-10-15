import { Alert } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { INote } from '../../../../interfaces/INote';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useWindowScroll } from '@mantine/hooks';

const Note = (): JSX.Element | null => {
  const globalStore = useGlobalStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();

  const [note, setNote] = useState<INote | null>(null);

  useEffect(() => {
    setNote(globalStore.selectedNote);
    scrollTo({ y: 0 });
  }, [globalStore.selectedNote]);

  if (!note) {
    return (
      <Alert icon={<AiOutlineInfoCircle />} title='No Note selected'>
        Select a note within a folder on the left hand side menu.
      </Alert>
    );
  }

  return (
    <div>
      <p>Note ID: {note.id}</p>
      <p>{note.note}</p>
      <br></br>
    </div>
  );
};

export default Note;
