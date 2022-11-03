import React, { useEffect, useState } from 'react';
import styles from './folderDashboard.module.css';

import { useGlobalStore } from '../../../../globalStore/globalStore';
import AnimateOnScreenLoad from '../../../../components/animateOnScreenLoad/animateOnScreenLoad';
import { INote } from '../../../../interfaces/INote';
import NoteItemFolderDashboard from './noteItem/noteItemFolderDashboard';
import { IFolder } from '../../../../interfaces/IFolder';
import { Alert, Button, Collapse, Text, Timeline } from '@mantine/core';

import { AiOutlineFileDone, AiOutlineClockCircle } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';

const FolderDashboard = () => {
  const globalStore = useGlobalStore();

  const [showCompletedNotes, setShowCompletedNotes] = useState(false);

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

    const notesToDisplay: INote[] = [];

    globalStore.isFolderDashboard.folder.notes.map((note: INote) => {
      if (note.status === status) {
        notesToDisplay.push(note);
        return <NoteItemFolderDashboard note={note} key={note.id} />;
      }
    });

    if (notesToDisplay.length === 0) {
      if (status === 'note') {
        return (
          <Alert title='Pretty empty out here man'>
            Cmon bro, start writing some notes or something.
          </Alert>
        );
      } else if (status === 'not_started') {
        return <Alert title='Nothing here...'>So far so empty...</Alert>;
      } else if (status === 'working') {
        return (
          <Alert title='Not working on anything'>
            You should start working on something you lazy mf
          </Alert>
        );
      } else if (status === 'done') {
        return (
          <Alert title='Good work'>
            You should be proud of yourself for NOT DOING ANYTHING
          </Alert>
        );
      }
    } else
      return notesToDisplay.map((note: INote) => {
        return <NoteItemFolderDashboard note={note} key={note.id} />;
      });
  };

  return (
    <AnimateOnScreenLoad>
      <>
        <div className={styles.notes_container}>
          <div className={styles.note_container}>
            <h2>{globalStore.isFolderDashboard?.folder.folder_name}</h2>
            {renderNotes('note')}
          </div>
          <div className={styles.right_container}>
            <Timeline active={2} bulletSize={28} lineWidth={2}>
              <Timeline.Item
                lineVariant='dashed'
                bullet={<AiOutlineClockCircle />}
                title='Not Started'
              >
                <div className={styles.timeline_item_container}>
                  {renderNotes('not_started')}
                </div>
              </Timeline.Item>

              <Timeline.Item bullet={<BiNote />} title='Working on it'>
                <div className={styles.timeline_item_container}>
                  {renderNotes('working')}
                </div>
              </Timeline.Item>

              <Timeline.Item
                bullet={<AiOutlineFileDone />}
                title='Done'
                lineVariant='dashed'
              >
                <Text mb={10} color='dimmed'>
                  Completed and archived notes.
                </Text>
                <Button
                  mb={10}
                  onClick={() => setShowCompletedNotes(!showCompletedNotes)}
                >
                  Show Completed Notes
                </Button>
                <Collapse in={showCompletedNotes}>
                  <div className={styles.timeline_item_container}>
                    {renderNotes('done')}
                  </div>
                </Collapse>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default FolderDashboard;
