import { Accordion, Alert, Drawer, Skeleton } from '@mantine/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getNoteHistory } from '../../../../api/notes/read/getNoteHistory';
import { getNoteTitle } from '../../../../functions/getNoteTitle';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { INote } from '../../../../interfaces/INote';
import styles from './noteHistory.module.css';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const NoteHistory = ({ isOpen, handleClose }: Props): JSX.Element => {
  return (
    <>
      <Drawer
        overlayBlur={5}
        className={styles.drawer}
        opened={isOpen}
        onClose={handleClose}
        title='Note History'
        padding='md'
        size='xl'
        position='right'
      >
        <DrawerContents />
      </Drawer>
    </>
  );
};

// I made this second component so the contents aren't always rendered
// This component will only be mounted when the drawer is on the screen
const DrawerContents = () => {
  const globalStore = useGlobalStore();

  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [noteHistory, setNoteHistory] = useState<INote[] | null>(null);

  useEffect(() => {
    if (!globalStore.selectedNote) return;

    const fetchData = async () => {
      const notes = await getNoteHistory({
        note_id: globalStore.selectedNote?.id ?? '',
        globalStore,
      });

      if (notes) {
        setNoteHistory([...notes].reverse());
      }

      setIsLoadingHistory(false);
    };

    fetchData();
  }, []);

  if (isLoadingHistory)
    return (
      <>
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
      </>
    );

  const renderNoteContent = (note: INote) => {
    const noteHeader = getNoteTitle({ note: note.note_archive_text ?? '' });

    if (noteHeader === 'Empty Note')
      return (
        <Alert title='Your note was empty at this time'>
          Your note did not have any contents at this time
        </Alert>
      );

    return (
      <div
        className='ProseMirror'
        dangerouslySetInnerHTML={{
          __html: note.note_archive_text ?? 'Unable to load note',
        }}
      />
    );
  };

  if (!noteHistory) return null;

  if (noteHistory.length === 0) {
    return (
      <Alert title='This note is brand new!'>
        There is no history for this note yet, as you edit this note, we&apos;ll
        keep track of changes and always save it here, so you never lose a note.
      </Alert>
    );
  }

  return (
    <>
      <Accordion>
        {noteHistory.map((note) => {
          return (
            <Accordion.Item value={note.id} key={note.id}>
              <Accordion.Control>
                {moment(note.createdAt).fromNow()}
              </Accordion.Control>
              <Accordion.Panel>{renderNoteContent(note)}</Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

export default NoteHistory;
