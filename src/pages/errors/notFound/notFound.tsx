import React from 'react';
import AnimateOnScreenLoad from '../../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './notFound.module.css';

const NotFound = (): JSX.Element => (
  <AnimateOnScreenLoad>
    <div className={styles.container}>
      <h1>404 Not Found</h1>
      <p>The page you are trying to access does not exist.</p>
    </div>
  </AnimateOnScreenLoad>
);

export default NotFound;
