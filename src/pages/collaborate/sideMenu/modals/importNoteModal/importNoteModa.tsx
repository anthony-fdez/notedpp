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

    return (
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
    );
  };

  return (
    <Modal opened={isOpen} onClose={handleClose} title='Import note'>
      <ConfirmImportNoteModal
        note={selectedNote}
        isOpen={isConfirmImportNoteModal}
        handleClose={() => setIsConfirmImportNoteModal(false)}
        handleCloseParentModal={handleClose}
      />
      <div>
        <Alert title='Override current editor'>
          Please be aware that importing one of your notes will override all the
          contents in the current collaboration session.
        </Alert>
        {renderFoldersAndNotes()}
        <div className={styles.footer_container}>
          <Button loaderPosition='left' type='submit'>
            Import Note
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportNoteModal;
