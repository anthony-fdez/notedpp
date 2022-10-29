import React from 'react';
import { INote } from '../../../interfaces/INote';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import TextEditor from '../../../components/editor/editor';
import styles from './editor.module.css';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import Typography from '@tiptap/extension-typography';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import CodeBlock from '../../../components/editor/codeBlock/codeBlock';
import EditorMenu from '../../../components/editor/menu/menu';
import { useGlobalStore } from '../../../globalStore/globalStore';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

interface Props {
  note: string | undefined;
}

const CollaborationEditor = ({ note }: Props) => {
  const globalStore = useGlobalStore();

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider('example-document', ydoc);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ document: false }),
      Document,
      CustomDocument,
      Paragraph,
      Typography,
      Text,
      CharacterCount,
      TaskList,

      TaskItem.configure({
        nested: true,
      }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }

          return 'Can you add some further context?';
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({ lowlight }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  }) as Editor;

  if (!editor) return null;

  return (
    <div>
      <TextEditor editor={editor} />
      <div className={styles.character_count_container}>
        {editor.storage.characterCount.words()} words
        <br />
        {editor.storage.characterCount.characters()} characters
      </div>
      <div
        style={{
          borderTop: `1px solid ${
            globalStore.theme === 'dark' ? 'rgb(80,80,80)' : 'rgb(230,230,230)'
          }`,
        }}
        className={styles.menu_buttons_container}
      >
        <EditorMenu editor={editor} />
      </div>
    </div>
  );
};

export default CollaborationEditor;
