import { Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
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
  const theme = useMantineTheme();
  return (
    <div className={styles.container}>
      <Switch
        className={styles.switch}
        size='md'
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        onLabel={
          <IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />
        }
        defaultChecked={globalStore.theme === 'dark'}
        onChange={(e) => handleThemeChange(e)}
        offLabel={
          <IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />
        }
        label='Theme'
      />
    </div>
  );
};

export default Settings;
