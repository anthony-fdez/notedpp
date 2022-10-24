import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Noted++</h3>
        <div className={styles.header_right}></div>
      </div>
    </div>
  );
};

export default Header;
