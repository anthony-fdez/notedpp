import { Switch } from '@mantine/core';
import React, { useEffect } from 'react';
import { useGlobalStore } from '../../../globalStore/globalStore';
import styles from './settings.module.css';

const Settings = (): JSX.Element => {
  const globalStore = useGlobalStore();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      return globalStore.setTheme('dark');
    }

    globalStore.setTheme('light');
  };

  useEffect(() => {
    console.log(globalStore.theme);
  }, [globalStore]);

  return (
    <div className={styles.container}>
      <Switch
        onChange={(e) => handleThemeChange(e)}
        defaultChecked={globalStore.theme === 'dark'}
        label='Dark theme'
      />
    </div>
  );
};

export default Settings;
