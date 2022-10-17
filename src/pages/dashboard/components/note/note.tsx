import { Alert } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { INote } from '../../../../interfaces/INote';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useWindowScroll } from '@mantine/hooks';
import TextEditor from '../editor/editor';
import { useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Menu from '../editor/menu/menu';

const Note: React.JSXElementConstructor<unknown> = (): JSX.Element => {
  const globalStore = useGlobalStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();

  const [note, setNote] = useState<INote | null>(null);

  useEffect(() => {
    setNote(globalStore.selectedNote);
    scrollTo({ y: 0 });
  }, [globalStore.selectedNote]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: true,
      }),
    ]
  }) as Editor;

  useEffect(() => {
    if(!note) return;
  }, [editor])

  if (!note) {
    return (
      <Alert icon={<AiOutlineInfoCircle />} title='No Note selected'>
        Select a note within a folder on the left hand side menu.
      </Alert>
    );
  }

  return (
    <div>
       <h1>Notes</h1>
       <div>
       <Menu editor= { editor } />
       </div>
      <div>
        <TextEditor editor ={ editor } />
      </div>
    </div>
  );
};

export default Note;
