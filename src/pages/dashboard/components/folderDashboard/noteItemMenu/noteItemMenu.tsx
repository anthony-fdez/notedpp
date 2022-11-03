import { Menu, Text } from '@mantine/core';
import React from 'react';
import { INote } from '../../../../../interfaces/INote';

import { BiNote } from 'react-icons/bi';
import { useGlobalStore } from '../../../../../globalStore/globalStore';

import {
  AiOutlineFileDone,
  AiOutlineClockCircle,
  AiOutlineFileText,
} from 'react-icons/ai';
import { updateNoteStatus } from '../../../../../api/notes/update/updateNoteStatus';

interface Props {
  children: JSX.Element;
  note: INote;
}

const NoteItemMenu = ({ children, note }: Props) => {
  const globalStore = useGlobalStore();

  const handleOpenNote = () => {
    globalStore.setSelectedNote(note);
    globalStore.setIsFolderDashboard(null);
  };

  const handleChangeStatus = async (status: string) => {
    await updateNoteStatus({ note_id: note.id, status, globalStore });
  };

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>

        <Menu.Item onClick={handleOpenNote} icon={<BiNote />}>
          Open
        </Menu.Item>

        <Menu.Divider />

        {note.status !== 'note' && (
          <Menu.Item
            onClick={() => handleChangeStatus('note')}
            icon={<AiOutlineFileText />}
          >
            Set as Note
          </Menu.Item>
        )}
        {note.status !== 'not_started' && (
          <Menu.Item
            onClick={() => handleChangeStatus('not_started')}
            icon={<AiOutlineClockCircle />}
          >
            Set as Not Started
          </Menu.Item>
        )}
        {note.status !== 'working' && (
          <Menu.Item
            onClick={() => handleChangeStatus('working')}
            icon={<BiNote />}
          >
            Working on it
          </Menu.Item>
        )}
        {note.status !== 'done' && (
          <Menu.Item
            onClick={() => handleChangeStatus('done')}
            icon={<AiOutlineFileDone />}
          >
            Mark as done
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item color='red'>Delete Note</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NoteItemMenu;
