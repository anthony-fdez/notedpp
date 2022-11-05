import { Text } from '@mantine/core';
import { useMouse } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Fade, Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax } from 'react-scroll-parallax';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import { fadeFromLeft, fadeFromRight } from '../animations/fadeInAnimations';
import styles from './jumbo.module.css';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  width: number;
  height: number;
}

const Jumbo = ({ width, height }: Props): JSX.Element => {
  const { ref, x, y } = useMouse();

  const animationX = useMotionValue(width);
  const animationY = useMotionValue(height);

  const moveXNoSpring = useTransform(animationX, [0, width], [-100, 100]);
  const moveYNoSpring = useTransform(animationY, [0, height], [-50, 50]);

  const moveX = useSpring(moveXNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const moveY = useSpring(moveYNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const moveXSlowNoSpring = useTransform(animationX, [0, width], [-25, 25]);
  const moveYSlowNoSpring = useTransform(animationY, [0, height], [-25, 25]);

  const moveXSlow = useSpring(moveXSlowNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const moveYSlow = useSpring(moveYSlowNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    animationX.set(x);
    animationY.set(y);
  }, [x, y]);

  return (
    <motion.div ref={ref} className={styles.jumbo}>
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
      <motion.div
        style={{
          x: moveXSlow,
          y: moveYSlow,
        }}
        className={styles.images_preview}
      >
        <Fade className={styles.glow_container} triggerOnce delay={1300}>
          <motion.div
            style={{
              x: moveX,
              y: moveY,
            }}
          >
            <div className={styles.images_glow} />
          </motion.div>
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
      </motion.div>
    </motion.div>
  );
};

export default Jumbo;
