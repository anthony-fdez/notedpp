import React from 'react';
import { Editor } from '@tiptap/react';
import { FaBold } from 'react-icons/fa';
import { AiOutlineItalic } from 'react-icons/ai';
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
import { Tabs } from '@mantine/core';

interface Props {
  editor: Editor;
}

const Menu: React.JSXElementConstructor<Props> = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <>
      <Tabs allowTabDeactivation={true} keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab
            value='first'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <FaBold />
          </Tabs.Tab>
          <Tabs.Tab
            value='second'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <AiOutlineItalic />
          </Tabs.Tab>
          <Tabs.Tab
            value='third'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <MdFormatStrikethrough />
          </Tabs.Tab>
          <Tabs.Tab
            value='fourth'
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <BsCodeSlash />
          </Tabs.Tab>
          <Tabs.Tab
            value='fifth'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            <BsTextParagraph />
          </Tabs.Tab>
          <Tabs.Tab
            value='sixth'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            H1
          </Tabs.Tab>
          <Tabs.Tab
            value='seventh'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            H2
          </Tabs.Tab>
          <Tabs.Tab
            value='eight'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            H3
          </Tabs.Tab>
          <Tabs.Tab
            value='ninth'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
            }
          >
            H4
          </Tabs.Tab>
          <Tabs.Tab
            value='tenth'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
            }
          >
            H5
          </Tabs.Tab>
          <Tabs.Tab
            value='eleventh'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <MdFormatListBulleted />
          </Tabs.Tab>
          <Tabs.Tab
            value='twelfth'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <AiOutlineOrderedList />
          </Tabs.Tab>
          <Tabs.Tab
            value='thirteenth'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            <BiCodeBlock />
          </Tabs.Tab>
          <Tabs.Tab
            value='fourteenth'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <GoQuote />
          </Tabs.Tab>
          <Tabs.Tab
            value='fifteenth'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <MdHorizontalRule />
          </Tabs.Tab>
          <Tabs.Tab
            value='sixteenth'
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <AiOutlineEnter />
          </Tabs.Tab>
          <Tabs.Tab
            value='seventeenth'
            onClick={() => editor.chain().focus().undo().run()}
          >
            <BiUndo />
          </Tabs.Tab>
          <Tabs.Tab
            value='eighteenth'
            onClick={() => editor.chain().focus().redo().run()}
          >
            <BiRedo />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
};

export default Menu;
