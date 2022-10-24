import React from 'react';
import ThemeSwitch from '../../../../components/profileDrawer/settings/components/themeSwitch/themeSwitch';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Noted++</h3>
        <div className={styles.header_right}>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
