import React from 'react';
import Logo from '../../../favN.png';
import AnimateOnScreenLoad from '../../components/animateOnScreenLoad/animateOnScreenLoad';
import LoginButton from '../../components/auth/loginButton/loginButtonHome';
import ThemeSwitch from '../../components/profileDrawer/settings/components/themeSwitch/themeSwitch';
import { useGlobalStore } from '../../globalStore/globalStore';
import notedBackground from './Back.png';
import styles from './home.module.css';
import transparentLogo from './transparentFav.png';

const Home: React.FC = (): JSX.Element => {
  const globalStore = useGlobalStore();

  return (
    <div className={styles.overall}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.switch}>
            <ThemeSwitch />
          </div>

          <div className={styles.bothImages}>
            <img src={notedBackground} alt='' className={styles.image} />
            <img src={transparentLogo} alt='' className={styles.imageLogo} />
          </div>
          <AnimateOnScreenLoad>
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
          </AnimateOnScreenLoad>
        </div>
      </div>
    </div>
  );
};

export default Home;
