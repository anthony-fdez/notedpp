import { Alert } from '@mantine/core';
import React, { useEffect, useMemo } from 'react';
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
import Typography from '@tiptap/extension-typography';
import { updateNote } from '../../../../api/notes/update/updateNote';
import Axios from 'axios';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

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
      Typography,
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
    content: globalStore.selectedNote?.note,
  }) as Editor;

  const updateNoteRequest = () => {
    const note = editor.getHTML();

    if (note === globalStore.selectedNote?.note) return;

    updateNote({
      new_note: note,
      globalStore,
      note_id: globalStore.selectedNote?.id ?? '',
    });
  };

  useEffect(() => {
    if (!editor) return;
    if (!globalStore.selectedNote) return;

    if (editor && globalStore.selectedNote) {
      editor.commands.setContent(globalStore.selectedNote.note);
    }

    const interval = setInterval(async () => {
      updateNoteRequest();
    }, 120000);

    return () => {
      clearInterval(interval);
      updateNoteRequest();
    };
  }, [editor, globalStore.selectedNote]);

  useEffect(() => {
    if (!editor) return;

    showNotification({
      id: 'loading-note',
      title: 'Loading updates...',
      message: 'Please wait while the note is being loaded.',
      autoClose: false,
      color: 'blue',
      loading: true,
    });

    Axios.post(
      'http://localhost:3001/notes/get-note',
      {
        note_id: globalStore.selectedNote?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user?.token || ''}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        globalStore.setSelectedNote(response.data.note);
        updateNotification({
          id: 'loading-note',
          color: 'blue',
          title: 'Loaded',
          message: 'Note contents loaded. Yay',
          icon: <IconCheck size={16} />,
          autoClose: 1000,
        });

        globalStore.updateFolders();
      })
      .catch((e) => {
        if (e.response.data.message) {
          showNotification({
            title: 'Error',
            message: e.response.data.message,
            color: 'red',
          });
        }

        console.log(e.response);
      });
  }, [editor, globalStore.selectedNote?.id]);

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
