import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styles from './modal.module.css';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  image: string;
  layoutId: string;
}

const Modal = ({ isOpen, handleClose, image, layoutId }: Props) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className={styles.backdrop}
            />
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className={styles.modal_container}
            >
              <motion.img
                layoutId={layoutId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.image}
                src={image}
              />
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
              <h1>Hello</h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
