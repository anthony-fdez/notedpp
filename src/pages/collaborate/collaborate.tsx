import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './collaborate.module.css';
import CollaborationEditor from './editor/editor';
import CollaborationSideMenu from './sideMenu/sideMenu';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const ydoc = new Y.Doc();

const Collaborate = () => {
  const { note } = useParams();
  const [provider, setProvider] = useState<WebrtcProvider | null>(null);

  useEffect(() => {
    if (!note) return;

    const newProvider = new WebrtcProvider(note, ydoc);

    setProvider(newProvider);
  }, [note]);

  if (!note) return;
  if (!provider) return;

  return (
    <AnimateOnScreenLoad>
      <>
        <CollaborationSideMenu provider={provider} />
        <div className={styles.container}>
          <CollaborationEditor ydoc={ydoc} provider={provider} />
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Collaborate;
