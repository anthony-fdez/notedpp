import { Variants, motion } from 'framer-motion';
import React, { useState } from 'react';
import styles from './fullScreenImage.module.css';

interface Props {
  children: JSX.Element;
  position: 'right' | 'left';
}

const FullScreenImage = ({ children, position }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const variants: Variants = {
    fullScreen: {
      width: '100vw',
      zIndex: 9999,
      transition: {
        type: 'linear',
        duration: 0.3,
      },
    },
    normal: {
      margin: 'auto ',
      width: '100%',
      transition: {
        type: 'spring',
        duration: 0.7,
        damping: 13,
      },
    },
  };

  return (
    <div
      className={isFullScreen ? styles.container_full_screen : styles.container}
    >
      <motion.div
        style={position === 'right' ? { right: 0 } : { left: 0 }}
        className={styles.image}
        variants={variants}
        animate={isFullScreen ? 'fullScreen' : 'normal'}
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FullScreenImage;
