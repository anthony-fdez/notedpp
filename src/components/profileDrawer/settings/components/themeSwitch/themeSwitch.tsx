import { Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';
import { useGlobalStore } from '../../../../../globalStore/globalStore';

const ThemeSwitch = () => {
  const globalStore = useGlobalStore();
  const theme = useMantineTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      return globalStore.setTheme('dark');
    }

    globalStore.setTheme('light');
  };

  return (
    <>
      <Switch
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
        label=''
      />
    </>
  );
};

export default ThemeSwitch;
