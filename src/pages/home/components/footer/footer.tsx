import React from 'react';
import { Fade } from 'react-awesome-reveal';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <Fade triggerOnce delay={400}>
      <div className={styles.footer}>
        <Fade className={styles.glow_container} triggerOnce delay={1000}>
          <div className={styles.glow_animation} />
        </Fade>
        <img src='/icon.png' />

        <div className={styles.text_container}>
          <h1>Noted++</h1>
          <p>
            Elit aute labore amet officia tempor. Consectetur est incididunt
            veniam laboris proident
          </p>
        </div>

        <LoginButton />
      </div>
    </Fade>
  );
};

export default Footer;
