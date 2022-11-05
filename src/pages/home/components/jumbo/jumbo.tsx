import { Text } from '@mantine/core';
import React from 'react';
import { Fade, Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax } from 'react-scroll-parallax';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import { fadeFromLeft, fadeFromRight } from '../animations/fadeInAnimations';
import styles from './jumbo.module.css';

const Jumbo = (): JSX.Element => {
  return (
    <div className={styles.jumbo}>
      <div className={styles.jumbo_text_container}>
        <Reveal keyframes={fadeFromLeft} triggerOnce>
          <div>
            <span>Noted++</span>
            <h1 className={styles.header_text}>
              All your note needs.
              <Text color='blue'>All in one place.</Text>
            </h1>
            <LoginButton />
          </div>
        </Reveal>
      </div>
      <div className={styles.images_preview}>
        <Fade className={styles.glow_container} triggerOnce delay={1300}>
          <div className={styles.images_glow} />
        </Fade>
        <Parallax speed={-5}>
          <Reveal keyframes={fadeFromRight} triggerOnce delay={500}>
            <LazyLoadImage
              className={styles.jumbo_image_1}
              alt={'First Screenshot'}
              src='/images/1.png'
            />
          </Reveal>
        </Parallax>

        <Reveal keyframes={fadeFromLeft} triggerOnce delay={800}>
          <LazyLoadImage
            className={styles.jumbo_image_2}
            alt={'First Screenshot'}
            src='/images/2.png'
          />
        </Reveal>
        <Parallax speed={10}>
          <Reveal keyframes={fadeFromRight} triggerOnce delay={1100}>
            <LazyLoadImage
              className={styles.jumbo_image_3}
              alt={'First Screenshot'}
              src='/images/3.png'
            />
          </Reveal>
        </Parallax>
      </div>
    </div>
  );
};

export default Jumbo;
