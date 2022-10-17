import { Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';
import Logo from '../../../favN.png';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import LoginButton from '../../components/auth/loginButton/loginButtonHome';
import { useGlobalStore } from '../../globalStore/globalStore';
import notedBackground from './Back.png';
import styles from './home.module.css';
import transparentLogo from './transparentFav.png';
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
      <div className={styles.overall}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Switch
              className={styles.switch}
              size='md'
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
              onLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
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
            <div className={styles.bothImages}>
              <img src={notedBackground} alt='' className={styles.image} />
              <img src={transparentLogo} alt='' className={styles.imageLogo} />
            </div>

            <div
              className={`${styles.rightContainer} ${
                globalStore.theme === 'dark'
                  ? styles.darkContainer
                  : styles.lightContainer
              }`}
            >
              <img src={Logo} alt='' className={styles.logo} />
              <h1
                className={
                  globalStore.theme === 'dark' ? styles.dark : styles.light
                }
              >
                Noted++
              </h1>
              <h3
                className={
                  globalStore.theme === 'dark' ? styles.dark : styles.light
                }
              >
                Become more organized.
              </h3>

              <div className={styles.button}>
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </AnimateOnScreenLoad>
  );
};

export default Home;
