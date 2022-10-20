import React from 'react';
import { Editor } from '@tiptap/react';
import { FaBold } from 'react-icons/fa';
import { AiOutlineItalic, AiOutlineCheckSquare } from 'react-icons/ai';
import { MdFormatStrikethrough } from 'react-icons/md';
import { BsCodeSlash } from 'react-icons/bs';
import { BsTextParagraph } from 'react-icons/bs';
import { MdFormatListBulleted } from 'react-icons/md';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BiCodeBlock } from 'react-icons/bi';
import { GoQuote } from 'react-icons/go';
import { MdHorizontalRule } from 'react-icons/md';
import { AiOutlineEnter } from 'react-icons/ai';
import { BiUndo } from 'react-icons/bi';
import { BiRedo } from 'react-icons/bi';
import { Button } from '@mantine/core';

interface Props {
  editor: Editor;
}

const Menu: React.JSXElementConstructor<Props> = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editor.isActive('paragraph') ? 'filled' : 'subtle'}
        >
          <BsTextParagraph />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive('heading', { level: 1 }) ? 'filled' : 'subtle'
          }
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive('heading', { level: 2 }) ? 'filled' : 'subtle'
          }
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive('heading', { level: 3 }) ? 'filled' : 'subtle'
          }
        >
          H3
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          variant={
            editor.isActive('heading', { level: 4 }) ? 'filled' : 'subtle'
          }
        >
          H4
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          variant={
            editor.isActive('heading', { level: 5 }) ? 'filled' : 'subtle'
          }
        >
          H5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'filled' : 'subtle'}
        >
          <FaBold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'filled' : 'subtle'}
        >
          <AiOutlineItalic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'filled' : 'subtle'}
        >
          <MdFormatStrikethrough />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          variant={editor.isActive('bulletList') ? 'filled' : 'subtle'}
        >
          <AiOutlineCheckSquare />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'filled' : 'subtle'}
        >
          <MdFormatListBulleted />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? 'filled' : 'subtle'}
        >
          <AiOutlineOrderedList />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? 'filled' : 'subtle'}
        >
          <BsCodeSlash />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? 'filled' : 'subtle'}
        >
          <BiCodeBlock />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'filled' : 'subtle'}
        >
          <GoQuote />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant='subtle'
        >
          <MdHorizontalRule />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          variant='subtle'
        >
          <AiOutlineEnter />
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          variant='subtle'
        >
          <BiUndo />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          variant='subtle'
        >
          <BiRedo />
        </Button>
      </div>
    </>
  );
};

export default Menu;
