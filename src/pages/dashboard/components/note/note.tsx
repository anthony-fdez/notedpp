import { Button, useMantineTheme } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '../../../../globalStore/globalStore';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useWindowScroll } from '@mantine/hooks';
import TextEditor from '../../../../components/editor/editor';
import { useEditor, Editor, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import styles from './note.module.css';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlock from '../../../../components/editor/codeBlock/codeBlock';
import { lowlight } from 'lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import RandomQuote from '../../../../components/randomQuote/randomQuote';
import Typography from '@tiptap/extension-typography';
import { updateNote } from '../../../../api/notes/update/updateNote';
import Axios from 'axios';
import { showNotification, updateNotification } from '@mantine/notifications';
import moment from 'moment';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import EditorMenu from '../../../../components/editor/menu/menu';
import NoteHistory from '../noteHistory/noteHistory';
import ShareButton from '../shareButton/shareButton';
import { useReactToPrint } from 'react-to-print';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Note: React.JSXElementConstructor<unknown> = (): JSX.Element | null => {
  const theme = useMantineTheme();
  const globalStore = useGlobalStore();

  const componentToDownloadRef = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll();
  const [lastSynced, setLastSynced] = useState(moment());
  const [isLoadingSavingNote, setIsLoadingSavingNote] = useState(false);
  const [isNoteHistoryOpen, setIsNoteHistoryOpen] = useState(false);

  useEffect(() => {
    scrollTo({ y: 0 });
  }, [globalStore.selectedNote]);

  const handlePrint = useReactToPrint({
    content: () => componentToDownloadRef.current,
    copyStyles: true,
  });

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
    ],
    content: globalStore.selectedNote?.note,
  }) as Editor;

  const handleSaveNote = async () => {
    const note = editor.getHTML();

    if (note === globalStore.selectedNote?.note) {
      return showNotification({
        title: 'No need to save the note!',
        message: 'Your note is already synced and saved!',
        color: 'blue',
      });
    }

    setIsLoadingSavingNote(true);

    await updateNote({
      new_note: note,
      globalStore,
      note_id: globalStore.selectedNote?.id ?? '',
    });

    const newNote = globalStore.selectedNote;

    if (newNote) {
      newNote.note = note;
      globalStore.setSelectedNote(newNote);
    }

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
      `${import.meta.env.VITE_BASE_URL}notes/get-note/`,
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

          globalStore.setSelectedNote(null);
        }
      });
  }, [editor, globalStore.selectedNote?.id]);

  if (!globalStore.selectedNote) {
    return (
      <div className={styles.no_note}>
        <img
          className={styles.no_note_image}
          src='/empty.svg'
          alt='No note selected'
        />
        <h1>No note selected</h1>
        <p> Select a note within a folder on the left hand side menu.</p>
      </div>
    );
  }

  if (!editor) return null;

  return (
    <div className={styles.container}>
      <NoteHistory
        isOpen={isNoteHistoryOpen}
        handleClose={() => setIsNoteHistoryOpen(false)}
      />
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
          <div className={styles.first_header_container}>
            <div className={styles.last_synced_container}>
              <Button
                onClick={handleSaveNote}
                loading={isLoadingSavingNote}
                className={styles.save_button}
                variant='light'
              >
                Save
              </Button>
              <p className={styles.last_saved_text}>
                Last saved {moment(lastSynced).fromNow()}
              </p>
            </div>
            <div className={styles.right_section}>
              <ShareButton
                note={globalStore.selectedNote}
                handlePrint={handlePrint}
              />

              <Button
                onClick={() => setIsNoteHistoryOpen(true)}
                variant='light'
              >
                Note History
              </Button>
            </div>
          </div>
          <div
            style={{
              borderTop: `1px solid ${
                globalStore.theme === 'dark'
                  ? 'rgb(80,80,80)'
                  : 'rgb(230,230,230)'
              }`,
            }}
            className={styles.menu_buttons_container}
          >
            <EditorMenu editor={editor} />
          </div>
        </div>

        <div ref={componentToDownloadRef}>
          <TextEditor editor={editor} />
        </div>
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
