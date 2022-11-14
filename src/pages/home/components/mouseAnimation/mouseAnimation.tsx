import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

interface Props {
  children: JSX.Element;
  width: number;
  height: number;
  x: number;
  y: number;
  moveX: number;
  moveY: number;
}

const MouseAnimation = ({
  children,
  width,
  height,
  x,
  y,
  moveX,
  moveY,
}: Props): JSX.Element => {
  const animationX = useMotionValue(width);
  const animationY = useMotionValue(height);

  const moveXNoSpring = useTransform(
    animationX,
    [0, width],
    [moveX * -1, moveX]
  );
  const moveYNoSpring = useTransform(
    animationY,
    [0, height],
    [moveY * -1, moveY]
  );

  const moveXAnimation = useSpring(moveXNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const moveYAnimation = useSpring(moveYNoSpring, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    animationX.set(x);
    animationY.set(y);
  }, [x, y]);

  return (
    <motion.div
      style={{
        x: moveXAnimation,
        y: moveYAnimation,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MouseAnimation;
