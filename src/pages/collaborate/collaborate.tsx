import { Alert, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import { INote } from '../../interfaces/INote';
import styles from './collaborate.module.css';
import CollaborationEditor from './editor/editor';
import CollaborationSideMenu from './sideMenu/sideMenu';

const Collaborate = () => {
  const { note } = useParams();

  useEffect(() => {
    if (!note) return;
  }, [note]);

  return (
    <AnimateOnScreenLoad>
      <>
        <CollaborationSideMenu />
        <div className={styles.container}>
          <CollaborationEditor note={note} />
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Collaborate;
