import { Text } from '@mantine/core';
import { useMouse } from '@mantine/hooks';
import React from 'react';
import { Fade, Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax } from 'react-scroll-parallax';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import { fadeFromLeft, fadeFromRight } from '../animations/fadeInAnimations';
import styles from './jumbo.module.css';

import { motion } from 'framer-motion';
import MouseAnimation from '../mouseAnimation/mouseAnimation';

interface Props {
  width: number;
  height: number;
}

const Jumbo = ({ width, height }: Props): JSX.Element => {
  const { ref, x, y } = useMouse();

  return (
    <motion.div ref={ref} className={styles.jumbo}>
      <div className={styles.jumbo_text_container}>
        <Reveal keyframes={fadeFromLeft} triggerOnce>
          <MouseAnimation {...{ height, width, x, y, moveX: 40, moveY: 15 }}>
            <div>
              <span>Noted++</span>
              <h1 className={styles.header_text}>
                All your note needs.
                <Text color='blue'>All in one place.</Text>
              </h1>
              <LoginButton />
            </div>
          </MouseAnimation>
        </Reveal>
      </div>
      <MouseAnimation {...{ height, width, x, y, moveX: 40, moveY: 15 }}>
        <motion.div className={styles.images_preview}>
          <Fade className={styles.glow_container} triggerOnce delay={1300}>
            {/* <MouseAnimation {...{ height, width, x, y, moveX: 100, moveY: 40 }}> */}
            <div className={styles.images_glow} />
            {/* </MouseAnimation> */}
          </Fade>
          <Parallax speed={-5}>
            <Reveal keyframes={fadeFromRight} triggerOnce delay={500}>
              <MouseAnimation
                {...{ height, width, x, y, moveX: 40, moveY: 25 }}
              >
                <LazyLoadImage
                  className={styles.jumbo_image_1}
                  alt={'First Screenshot'}
                  src='/images/1.png'
                />
              </MouseAnimation>
            </Reveal>
          </Parallax>

          <Reveal keyframes={fadeFromLeft} triggerOnce delay={800}>
            <MouseAnimation {...{ height, width, x, y, moveX: 15, moveY: 10 }}>
              <LazyLoadImage
                className={styles.jumbo_image_2}
                alt={'First Screenshot'}
                src='/images/2.png'
              />
            </MouseAnimation>
          </Reveal>
          <Parallax speed={10}>
            <Reveal keyframes={fadeFromRight} triggerOnce delay={1100}>
              <MouseAnimation
                {...{ height, width, x, y, moveX: 30, moveY: 20 }}
              >
                <LazyLoadImage
                  className={styles.jumbo_image_3}
                  alt={'First Screenshot'}
                  src='/images/3.png'
                />
              </MouseAnimation>
            </Reveal>
          </Parallax>
        </motion.div>
      </MouseAnimation>
    </motion.div>
  );
};

export default Jumbo;
