/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import styles from './codeBlock.module.css';

interface Props {
  node: any;
  updateAttributes: any;
  extension: any;
}

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: Props) => (
  <NodeViewWrapper className={styles.code_block}>
    <select
      className={styles.select}
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
    >
      <option value='null'>auto</option>
      <option disabled>—</option>
      {extension.options.lowlight
        .listLanguages()
        .map((lang: any, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
    </select>
    <pre>
      <NodeViewContent as='code' />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlock;
