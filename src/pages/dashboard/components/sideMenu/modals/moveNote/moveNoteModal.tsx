import { Button, Modal, Select } from '@mantine/core';
import React, { useState } from 'react';
import { moveNote } from '../../../../../../api/notes/update/moveNote';
import { useGlobalStore } from '../../../../../../globalStore/globalStore';
import { INote } from '../../../../../../interfaces/INote';
import styles from '../modals.module.css';

interface Props {
  note: INote;
  isOpen: boolean;
  handleClose: () => void;
}

interface ISelectedFolder {
  value: string;
  label: string;
}

const MoveNoteModal = ({ isOpen, handleClose, note }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isLoadingMovingNote, setIsLoadingMovingNote] = useState(false);

  const handleMoveNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingMovingNote(true);

    await moveNote({
      globalStore,
      note_id: note.id,
      new_folder_id: selectedFolder ?? '',
    });

    setIsLoadingMovingNote(false);
    handleClose();
  };

  const renderSelect = (): JSX.Element | null => {
    if (!globalStore.folders) return null;

    const parsedDataForSelect: ISelectedFolder[] = [];

    globalStore.folders.forEach((folder) => {
      parsedDataForSelect.push({ value: folder.id, label: folder.folder_name });
    });

    return (
      <Select
        label='Select what folder to move this note to'
        placeholder='Pick one'
        data={parsedDataForSelect}
        value={selectedFolder}
        onChange={(value) => setSelectedFolder(value)}
      />
    );
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title='Move note to another folder'
    >
      <form onSubmit={(e) => handleMoveNote(e)}>
        {renderSelect()}
        <div className={styles.footer_container}>
          <Button
            loaderPosition='left'
            loading={isLoadingMovingNote}
            type='submit'
            disabled={!selectedFolder}
          >
            Move Note
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MoveNoteModal;
