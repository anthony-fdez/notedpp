import { Avatar } from '@mantine/core';
import moment from 'moment';
import React from 'react';
import { IMessage } from '../../sideMenu';
import styles from './message.module.css';

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props) => {
  if (!message) return null;

  if (message.name === 'Bot') {
    return (
      <div className={styles.bot_message}>
        <Avatar size={20} className={styles.bot_avatar} src='/icon.png' />
        <p>{message.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.message_container}>
      <p className={styles.message_name}>{message.name}</p>
      <p className={styles.message_message}>{message.message}</p>
      <p className={styles.message_time}>{moment(message.time).fromNow()}</p>
    </div>
  );
};

export default Message;
