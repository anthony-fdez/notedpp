import { Alert } from '@mantine/core';
import React, { useEffect } from 'react';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useWindowScroll } from '@mantine/hooks';
import TextEditor from '../editor/editor';
import { useEditor, Editor, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import Menu from '../editor/menu/menu';
import styles from './note.module.css';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlock from '../editor/codeBlock/codeBlock';
import { lowlight } from 'lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import RandomQuote from '../../../../components/randomQuote/randomQuote';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Note: React.JSXElementConstructor<unknown> = (): JSX.Element | null => {
  const globalStore = useGlobalStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();

  useEffect(() => {
    scrollTo({ y: 0 });
  }, [globalStore.selectedNote]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ document: false }),
      Document,
      CustomDocument,
      Paragraph,
      Text,
      CharacterCount,
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
    ],
  }) as Editor;

  if (!globalStore.selectedNote) {
    return (
      <Alert icon={<AiOutlineInfoCircle />} title='No Note selected'>
        Select a note within a folder on the left hand side menu.
      </Alert>
    );
  }

  if (!editor) return null;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.menu}>
          <Menu editor={editor} />
        </div>

        <TextEditor editor={editor} />
        <div className={styles.character_count_container}>
          {editor.storage.characterCount.words()} words
          <br />
          {editor.storage.characterCount.characters()} characters
        </div>
      </div>

      <RandomQuote />
    </div>
  );
};

export default Note;
