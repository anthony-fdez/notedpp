import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './collaborate.module.css';
import CollaborationEditor from './editor/editor';
import CollaborationSideMenu from './sideMenu/sideMenu';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useGlobalStore } from '../../globalStore/globalStore';
import Chat from './sideMenu/chat/chat';

const ydoc = new Y.Doc();

const Collaborate = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const { note } = useParams();
  const [provider, setProvider] = useState<WebrtcProvider | null>(null);

  useEffect(() => {
    if (!note) return;

    globalStore.setCollaborationImportedNote(null);

    const newProvider = new WebrtcProvider(note, ydoc);

    setProvider(newProvider);
  }, [note]);

  if (!note) return null;
  if (!provider) return null;

  return (
    <AnimateOnScreenLoad>
      <>
        <CollaborationSideMenu provider={provider} />
        <div className={styles.container}>
          <CollaborationEditor ydoc={ydoc} provider={provider} />
        </div>
        <Chat />
      </>
    </AnimateOnScreenLoad>
  );
};

export default Collaborate;
