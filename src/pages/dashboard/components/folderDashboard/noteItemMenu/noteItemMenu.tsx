import { Menu, Text } from '@mantine/core';
import React from 'react';
import { INote } from '../../../../../interfaces/INote';

import { BiNote } from 'react-icons/bi';
import { useGlobalStore } from '../../../../../globalStore/globalStore';

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

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item>Transfer my data</Menu.Item>
        <Menu.Item color='red'>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NoteItemMenu;
