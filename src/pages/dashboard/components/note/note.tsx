import { Alert, Button, useMantineTheme } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
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
import moment from 'moment';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Note: React.JSXElementConstructor<unknown> = (): JSX.Element | null => {
  const theme = useMantineTheme();
  const globalStore = useGlobalStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();
  const [lastSynced, setLastSynced] = useState(moment());
  const [isLoadingSavingNote, setIsLoadingSavingNote] = useState(false);

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
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
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

  const handleSaveNote = async () => {
    setIsLoadingSavingNote(true);

    const note = editor.getHTML();

    await updateNote({
      new_note: note,
      globalStore,
      note_id: globalStore.selectedNote?.id ?? '',
    });

    setIsLoadingSavingNote(false);
    setLastSynced(moment());
  };

  const updateNoteRequest = () => {
    const note = editor.getHTML();

    if (note === globalStore.selectedNote?.note) return;
    if (!globalStore.selectedNote) return;

    updateNote({
      new_note: note,
      globalStore,
      note_id: globalStore.selectedNote?.id ?? '',
    });

    setLastSynced(moment());
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
    if (!globalStore.selectedNote) return;

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
          updateNotification({
            id: 'loading-note',
            color: 'red',
            title: 'Error',
            message: e.response.data.message,
            autoClose: 1000,
          });
        }
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
        <div
          style={{
            borderBottom: `1px solid ${
              globalStore.theme === 'dark'
                ? 'rgb(80,80,80)'
                : 'rgb(230,230,230)'
            }`,
            backgroundColor:
              globalStore.theme === 'dark' ? theme.black : theme.white,
          }}
          className={styles.menu}
        >
          <Menu editor={editor} />
          <div className={styles.last_synced_container}>
            <Button
              onClick={handleSaveNote}
              loading={isLoadingSavingNote}
              className={styles.save_button}
              variant='light'
            >
              Save
            </Button>
            <p>Last saved {moment(lastSynced).fromNow()}</p>
          </div>
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
