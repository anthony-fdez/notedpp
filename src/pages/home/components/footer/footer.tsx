import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import { fadeFromBottom } from '../animations/fadeInAnimations';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <Reveal keyframes={fadeFromBottom} triggerOnce delay={400}>
      <div className={styles.footer}>
        <Reveal
          keyframes={fadeFromBottom}
          className={styles.glow_container}
          triggerOnce
          delay={1000}
        >
          <div className={styles.glow_animation} />
        </Reveal>
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
    </Reveal>
  );
};

export default Footer;
