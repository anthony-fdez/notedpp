import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';
import styles from './bubbleMenu.module.css';

import { FaBold } from 'react-icons/fa';
import { AiOutlineItalic } from 'react-icons/ai';
import { MdFormatStrikethrough } from 'react-icons/md';
import { BsCodeSlash } from 'react-icons/bs';

interface Props {
  editor: Editor;
}

const BubbleMenuComponent = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        className={styles.bubble_menu}
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <AiOutlineItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <MdFormatStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <BsCodeSlash />
        </button>
      </BubbleMenu>
    </>
  );
};

export default BubbleMenuComponent;
