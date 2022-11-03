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
          <Menu.Item icon={<AiOutlineFileText />}>Set as Note</Menu.Item>
        )}
        {note.status !== 'not_started' && (
          <Menu.Item icon={<AiOutlineClockCircle />}>
            Set as Not Started
          </Menu.Item>
        )}
        {note.status !== 'working' && (
          <Menu.Item icon={<BiNote />}>Working on it</Menu.Item>
        )}
        {note.status !== 'done' && (
          <Menu.Item icon={<AiOutlineFileDone />}>Mark as done</Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item color='red'>Delete Note</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NoteItemMenu;
