import ThemeSwitch from './components/themeSwitch/themeSwitch';
import styles from './settings.module.css';
import React from 'react';

const Settings = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <ThemeSwitch />
    </div>
  );
};

export default Settings;
