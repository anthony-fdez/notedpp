/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
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
import { useAuth0 } from '@auth0/auth0-react';
import { stringToColor } from '../../../functions/stringToColor';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useMantineTheme } from '@mantine/core';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

interface Props {
  ydoc: Y.Doc;
  provider: WebrtcProvider;
}

const CollaborationEditor = ({ ydoc, provider }: Props) => {
  const globalStore = useGlobalStore();
  const theme = useMantineTheme();
  const { user } = useAuth0();

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
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: user?.name || 'Unknown',
          color: stringToColor(user?.name || 'Unknown'),
          avatar: user?.picture || null,
        },
      }),
    ],
  }) as Editor;

  useEffect(() => {
    if (!editor) return;
    if (!globalStore.collaborationImportedNote) return;

    editor.commands.setContent(globalStore.collaborationImportedNote);

    globalStore.setCollaborationImportedNote(null);
  }, [globalStore.collaborationImportedNote]);

  if (!editor) return null;

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
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

          backgroundColor:
            globalStore.theme === 'dark' ? theme.black : theme.white,
        }}
        className={styles.menu_buttons_container}
      >
        {/* @ts-ignore */}
        <EditorMenu editor={editor} />
      </div>
    </div>
  );
};

export default CollaborationEditor;
