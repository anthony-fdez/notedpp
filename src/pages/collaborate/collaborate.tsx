import React from 'react';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './collaborate.module.css';
import CollaborationEditor from './editor/editor';
import CollaborationSideMenu from './sideMenu/sideMenu';

const Collaborate = () => {
  return (
    <AnimateOnScreenLoad>
      <>
        <CollaborationSideMenu />
        <div className={styles.container}>
          <CollaborationEditor />
        </div>
      </>
    </AnimateOnScreenLoad>
  );
};

export default Collaborate;
