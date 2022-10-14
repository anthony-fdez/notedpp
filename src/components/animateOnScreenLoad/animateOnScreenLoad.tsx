import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface Props {
  children: JSX.Element;
}

const AnimateOnScreenLoad = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial='hidden' animate='show' variants={variants}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateOnScreenLoad;
