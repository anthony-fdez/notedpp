import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';

import io from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('disconected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>chat</h1>
    </div>
  );
};

export default Chat;
