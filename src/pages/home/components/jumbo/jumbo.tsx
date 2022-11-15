import { Text } from '@mantine/core';
import { useMouse } from '@mantine/hooks';
import React, { useState } from 'react';
import { Fade, Reveal } from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Parallax } from 'react-scroll-parallax';
import LoginButton from '../../../../components/auth/loginButton/loginButton';
import { fadeFromLeft, fadeFromRight } from '../animations/fadeInAnimations';
import styles from './jumbo.module.css';

import { motion, Variants } from 'framer-motion';
import MouseAnimation from '../mouseAnimation/mouseAnimation';

interface Props {
  width: number;
  height: number;
}

const Jumbo = ({ width, height }: Props): JSX.Element => {
  const { ref, x, y } = useMouse();

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const variants: Variants = {
    show: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    hide: {
      opacity: 0.1,
      transition: { duration: 0.2 },
    },
  };

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
      <MouseAnimation {...{ height, width, x, y, moveX: 40, moveY: 15 }}>
        <motion.div className={styles.images_preview}>
          <Fade className={styles.glow_container} triggerOnce delay={1300}>
            <div className={styles.images_glow} />
          </Fade>
          <Parallax speed={-5}>
            <Reveal keyframes={fadeFromRight} triggerOnce delay={500}>
              <MouseAnimation
                {...{ height, width, x, y, moveX: 40, moveY: 25 }}
              >
                <motion.div
                  variants={variants}
                  animate={hover2 || hover3 ? 'hide' : 'show'}
                >
                  <LazyLoadImage
                    onMouseEnter={() => {
                      setHover1(true);
                    }}
                    onMouseLeave={() => {
                      setHover1(false);
                    }}
                    className={styles.jumbo_image_1}
                    alt={'First Screenshot'}
                    src='/images/1.png'
                  />
                </motion.div>
              </MouseAnimation>
            </Reveal>
          </Parallax>

          <Reveal keyframes={fadeFromLeft} triggerOnce delay={800}>
            <MouseAnimation {...{ height, width, x, y, moveX: 15, moveY: 10 }}>
              <motion.div
                variants={variants}
                animate={hover1 || hover3 ? 'hide' : 'show'}
              >
                <LazyLoadImage
                  onMouseEnter={() => {
                    setHover2(true);
                  }}
                  onMouseLeave={() => {
                    setHover2(false);
                  }}
                  className={styles.jumbo_image_2}
                  alt={'First Screenshot'}
                  src='/images/2.png'
                />
              </motion.div>
            </MouseAnimation>
          </Reveal>
          <Parallax speed={10}>
            <Reveal keyframes={fadeFromRight} triggerOnce delay={1100}>
              <MouseAnimation
                {...{ height, width, x, y, moveX: 30, moveY: 20 }}
              >
                <motion.div
                  variants={variants}
                  animate={hover1 || hover2 ? 'hide' : 'show'}
                >
                  <LazyLoadImage
                    onMouseEnter={() => {
                      setHover3(true);
                    }}
                    onMouseLeave={() => {
                      setHover3(false);
                    }}
                    className={styles.jumbo_image_3}
                    alt={'First Screenshot'}
                    src='/images/3.png'
                  />
                </motion.div>
              </MouseAnimation>
            </Reveal>
          </Parallax>
        </motion.div>
      </MouseAnimation>
    </motion.div>
  );
};

export default Jumbo;
