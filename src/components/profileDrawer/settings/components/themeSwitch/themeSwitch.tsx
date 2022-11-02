import { Switch, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useGlobalStore } from '../../../../../globalStore/globalStore';
import { BsCloudMoon, BsSun } from 'react-icons/bs';

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
        onLabel={<BsSun size={16} color={theme.colors.yellow[4]} />}
        defaultChecked={globalStore.theme === 'dark'}
        onChange={(e) => handleThemeChange(e)}
        offLabel={<BsCloudMoon size={16} color={theme.colors.blue[6]} />}
        label=''
      />
    </>
  );
};

export default ThemeSwitch;
