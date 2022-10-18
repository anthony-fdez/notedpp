import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';
import styles from './bubbleMenu.module.css';

import { FaBold } from 'react-icons/fa';
import { AiOutlineItalic } from 'react-icons/ai';
import { MdFormatStrikethrough } from 'react-icons/md';
import { BsCodeSlash } from 'react-icons/bs';
import { Box, Button, Group } from '@mantine/core';
import { useGlobalStore } from '../../../../../globalStore/globalStore';

interface Props {
  editor: Editor;
}

const BubbleMenuComponent = ({ editor }: Props) => {
  const globalStore = useGlobalStore();
  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        className={globalStore.theme === 'dark' ? styles.dark : styles.light}
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        <Group spacing='sm'>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant='subtle'
          >
            <FaBold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant='subtle'
          >
            <AiOutlineItalic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant='subtle'
          >
            <MdFormatStrikethrough />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            variant='subtle'
          >
            <BsCodeSlash />
          </Button>
        </Group>
      </BubbleMenu>
    </>
  );
};

export default BubbleMenuComponent;
