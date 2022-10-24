import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './shared.module.css';

const Shared = () => {
  const { note } = useParams();

  useEffect(() => {
    if (!note) return;
  }, [note]);

  return (
    <div className={styles.container}>
      <h1>{note}</h1>
    </div>
  );
};

export default Shared;
