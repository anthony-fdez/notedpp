import { Accordion, Alert, Button, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { getNoteTitle } from '../../../../../functions/getNoteTitle';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { IFolder } from '../../../../../interfaces/IFolder';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from '../modals.module.css';
import ConfirmImportNoteModal from './confirmImportModal';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ImportNoteModal = ({ isOpen, handleClose }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isConfirmImportNoteModal, setIsConfirmImportNoteModal] =
    useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const renderFoldersAndNotes = () => {
    if (!globalStore.folders) return null;

    if (globalStore.folders.length === 0) {
      return (
        <>
          <Alert title="You don't have any notes">
            Before you are able to import notes to a collaborative session you
            first need some notes.
          </Alert>
          <div className={styles.footer_container}>
            <Button loaderPosition='left' onClick={handleClose}>
              Got it!
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <Alert title='Override current editor'>
          Please be aware that importing one of your notes will override all the
          contents in the current collaboration session.
        </Alert>
        <div className={styles.accordion_container}>
          <Accordion>
            {globalStore.folders.map((folder: IFolder) => {
              return (
                <Accordion.Item key={folder.id} value={folder.id}>
                  <Accordion.Control>{folder.folder_name}</Accordion.Control>
                  <Accordion.Panel>
                    {folder.notes.map((note) => {
                      return (
                        <Button
                          leftIcon={<AiOutlinePlus />}
                          variant='subtle'
                          className={styles.note_button}
                          key={note.id}
                          onClick={() => {
                            setSelectedNote(note.note);
                            setIsConfirmImportNoteModal(true);
                          }}
                        >
                          {getNoteTitle({ note: note.note })}
                        </Button>
                      );
                    })}
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
        <div className={styles.footer_container}>
          <Button loaderPosition='left' type='submit'>
            Import Note
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal
      overlayBlur={5}
      opened={isOpen}
      onClose={handleClose}
      title='Import note'
    >
      <ConfirmImportNoteModal
        note={selectedNote}
        isOpen={isConfirmImportNoteModal}
        handleClose={() => setIsConfirmImportNoteModal(false)}
        handleCloseParentModal={handleClose}
      />
      <div>{renderFoldersAndNotes()}</div>
    </Modal>
  );
};

export default ImportNoteModal;
