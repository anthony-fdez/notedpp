import { Alert, Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { INote } from '../../interfaces/INote';
import Header from './components/header/header.sharedNote';
import styles from './shared.module.css';
import { MdErrorOutline } from 'react-icons/md';
import { getSharedNote } from '../../api/notes/read/getSharedNote';

// Code highlighting
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const Shared = () => {
  const { note } = useParams();
  const [noteData, setNoteData] = useState<INote | 'loading' | null>('loading');

  useEffect(() => {
    if (!note) return;

    const note_id = note.split('-')[0];
    const user_id = note.split('-')[1];

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

  useEffect(() => {
    hljs.initHighlighting();
  }, [noteData]);

  if (noteData === 'loading') {
    return (
      <div className={styles.container}>
        <Header />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
        <Skeleton height={50} mb={10} />
      </div>
    );
  }

  if (noteData === null) {
    return (
      <div className={styles.container}>
        <Header />
        <Alert icon={<MdErrorOutline />} color={'red'} title='Invalid link'>
          We could not find this note, this is most likely because this note was
          deleted... or our servers are down, we don&apos;t know
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div
        className='ProseMirror'
        dangerouslySetInnerHTML={{ __html: noteData.note }}
      />
    </div>
  );
};

export default Shared;
