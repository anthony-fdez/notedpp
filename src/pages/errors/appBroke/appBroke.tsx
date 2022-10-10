import React from 'react';
import AnimateOnScreenLoad from '../../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './appBroke.module.css';

const AppBroke = (): JSX.Element => (
  <AnimateOnScreenLoad>
    <div className={styles.container}>
      <h1>Looks like we ran into a problem...</h1>
      <p>Try again later</p>
    </div>
  </AnimateOnScreenLoad>
);

export default AppBroke;
