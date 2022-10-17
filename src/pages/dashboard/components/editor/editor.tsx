import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import styles from './editor.module.css';

interface Props {
    editor: Editor 
}

const TextEditor: React.JSXElementConstructor<Props> = ({ editor}: Props) => {
  return (
    <div>
        <EditorContent className={styles.editor} editor={ editor } />
    </div>
  );
};

export default TextEditor;
