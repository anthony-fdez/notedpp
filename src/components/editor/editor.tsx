import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import styles from './editor.module.css';
import BubbleMenuComponent from './bubbleMenu/bubbleMenu';

interface Props {
  editor: Editor;
}

const TextEditor: React.JSXElementConstructor<Props> = ({ editor }: Props) => {
  return (
    <div className={styles.container}>
      <BubbleMenuComponent editor={editor} />
      <EditorContent id='editor' className={styles.editor} editor={editor} />
    </div>
  );
};

export default TextEditor;
