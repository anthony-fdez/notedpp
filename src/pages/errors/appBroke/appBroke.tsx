import React from 'react';
import AnimateOnScreenLoad from '../../../components/animateOnScreenLoad/animateOnScreenLoad';
import styles from './appBroke.module.css';

interface Props {
  message?: string;
}

const AppBroke = ({ message }: Props): JSX.Element => (
  <AnimateOnScreenLoad>
    <div className={styles.container}>
      <img className={styles.image} src='/error.svg' />
      <h1>Looks like we ran into a problem...</h1>
      <p>Try again later</p>
      <br></br>

      {message && <p className={styles.extra_message}>{message}</p>}
    </div>
  </AnimateOnScreenLoad>
);

export default AppBroke;
