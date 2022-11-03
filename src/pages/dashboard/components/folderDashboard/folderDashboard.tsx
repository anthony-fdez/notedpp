import React, { useEffect } from 'react';
import styles from './folderDashboard.module.css';

import { useGlobalStore } from '../../../../globalStore/globalStore';
import AnimateOnScreenLoad from '../../../../components/animateOnScreenLoad/animateOnScreenLoad';
import { INote } from '../../../../interfaces/INote';
import NoteItemFolderDashboard from './noteItem/noteItemFolderDashboard';
import { IFolder } from '../../../../interfaces/IFolder';

const FolderDashboard = () => {
  const globalStore = useGlobalStore();

  useEffect(() => {
    if (!globalStore.folders) return;

    const folder = globalStore.folders.find(
      (folder: IFolder) =>
        folder.id === globalStore.isFolderDashboard?.folder.id
    );

    if (!folder) return;

    globalStore.setIsFolderDashboard({ isOpen: true, folder });
  }, [globalStore.folders]);

  const renderNotes = (status: 'note' | 'not_started' | 'working' | 'done') => {
    if (!globalStore.isFolderDashboard) return null;

    return globalStore.isFolderDashboard.folder.notes.map((note: INote) => {
      if (note.status === status) {
        return <NoteItemFolderDashboard note={note} key={note.id} />;
      }
    });
  };

  return (
    <AnimateOnScreenLoad>
      <>
        <div className={styles.notes_container}>
          <div className={styles.note_container}>
            <h1>Notes</h1>
            {renderNotes('note')}
          </div>
          <div className={styles.note_container}>
            <h1>Working on it</h1>
          </div>
          <div className={styles.right_container}>
            <div className={styles.note_container}>
              <h1>Not started</h1>
            </div>
            <div className={styles.note_container}>
              <h1>Done</h1>
            </div>
          </div>
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default FolderDashboard;
