import { Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import LoginButton from '../../components/auth/loginButton/loginButtonHome';
import { useGlobalStore } from '../../globalStore/globalStore';
import styles from './home.module.css';
import Wave from './Wave.svg';
const Home: React.FC = (): JSX.Element => {
  const globalStore = useGlobalStore();
  console.log(globalStore.theme);
  const theme = useMantineTheme();
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      return globalStore.setTheme('dark');
    }

    globalStore.setTheme('light');
  };
  return (
    <AnimateOnScreenLoad>
      <div className={styles.container}>
        <div className={styles.content}>
          <Switch
            className={styles.switch}
            size='md'
            color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            onLabel={
              <IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />
            }
            onChange={(e) => handleThemeChange(e)}
            offLabel={
              <IconMoonStars
                size={16}
                stroke={2.5}
                color={theme.colors.blue[6]}
              />
            }
          />
          <h1
            className={
              globalStore.theme === 'dark' ? styles.dark : styles.light
            }
          >
            Noted++
          </h1>
          <h2
            className={
              globalStore.theme === 'dark' ? styles.dark : styles.light
            }
          >
            Just A Note App But Better
          </h2>
          <p
            className={
              globalStore.theme === 'dark' ? styles.dark : styles.light
            }
          >
            Better focus. Better understanding. Better organization
          </p>
          <div className={styles.button}>
            <LoginButton />
          </div>
        </div>
        <img src={Wave} alt='' className={styles.wave} />
        <div></div>
      </div>
    </AnimateOnScreenLoad>
  );
};

export default Home;
