import { Text } from '@mantine/core';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax } from 'react-scroll-parallax';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import styles from './jumbo.module.css';

const Jumbo = (): JSX.Element => {
  return (
    <div className={styles.jumbo}>
      <div className={styles.jumbo_text_container}>
        <Fade triggerOnce>
          <div>
            <span>Noted++</span>
            <h1 className={styles.header_text}>
              All your note needs.
              <Text color='blue'>All in one place.</Text>{' '}
            </h1>
            <LoginButton />
          </div>
        </Fade>
      </div>
      <div className={styles.images_preview}>
        <div className={styles.images_glow} />
        <Parallax speed={-5}>
          <Fade triggerOnce delay={500}>
            <LazyLoadImage
              className={styles.jumbo_image_1}
              alt={'First Screenshot'}
              src='/images/1.png' // use normal <img> attributes as props
            />
          </Fade>
        </Parallax>

        <Fade triggerOnce delay={800}>
          <LazyLoadImage
            className={styles.jumbo_image_2}
            alt={'First Screenshot'}
            src='/images/2.png' // use normal <img> attributes as props
          />
        </Fade>
        <Parallax speed={10}>
          <Fade triggerOnce delay={1100}>
            <LazyLoadImage
              className={styles.jumbo_image_3}
              alt={'First Screenshot'}
              src='/images/3.png' // use normal <img> attributes as props
            />
          </Fade>
        </Parallax>
      </div>
    </div>
  );
};

export default Jumbo;
