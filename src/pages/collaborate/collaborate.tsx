import { Alert, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedNote } from '../../api/notes/read/getSharedNote';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import { INote } from '../../interfaces/INote';
import styles from './collaborate.module.css';
import CollaborationEditor from './editor/editor';
import CollaborationSideMenu from './sideMenu/sideMenu';

const Collaborate = () => {
  const { note } = useParams();

  const [noteData, setNoteData] = useState<INote | 'loading' | null>('loading');
  const [noteId, setNoteId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (!note) return;

    const note_id = note.split('---')[0];
    const user_id = note.split('---')[1];
    const folder_id = note.split('---')[2];

    setNoteId(note_id);
    setUserId(user_id);
    setFolderId(folder_id);

    const getNoteData = async () => {
      const data: INote | null = await getSharedNote({ note_id, user_id });

      if (!data) {
        setNoteData(null);
      } else {
        setNoteData(data);
      }
    };

    getNoteData();
  }, [note]);

  const renderEditor = () => {
    if (noteData === 'loading') {
      return (
        <Alert icon={<Loader />} title='Loading...'>
          Loading the contents of the note, please wait
        </Alert>
      );
    }

    if (noteData === null) {
      return (
        <Alert color='red' title='Error loading the note...'>
          There was an error loading the note contents, please try again later.
          Note that maybe this note was deleted.
        </Alert>
      );
    }

    return (
      <CollaborationEditor {...{ note, noteId, userId, folderId, noteData }} />
    );
  };

  return (
    <AnimateOnScreenLoad>
      <>
        <CollaborationSideMenu />
        <div className={styles.container}>{renderEditor()}</div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Collaborate;
