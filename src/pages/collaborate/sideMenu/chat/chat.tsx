import React, { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';

import { useAuth0 } from '@auth0/auth0-react';
import { showNotification } from '@mantine/notifications';
import { ActionIcon, Input, Loader } from '@mantine/core';
import { Socket } from 'socket.io-client';
import { IoMdSend } from 'react-icons/io';
import Message from './message/message';
import { IMessage, ITyping } from '../sideMenu';

interface Props {
  room: string;
  socket: Socket;
  messages: any;
  typing: ITyping;
}

const Chat = ({ room, socket, typing, messages }: Props) => {
  const { user } = useAuth0();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [messageText, setMessageText] = useState<string>('');

  const scrollToBottom = (): null | void => {
    if (!messagesEndRef.current) return null;

    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    const data = {
      message: messageText,
      name: user?.name,
      id: user?.sub,
      room: room,
      time: new Date(),
    };

    if (messageText.length > 1) {
      socket.emit('sendMessage', data);
    } else {
      showNotification({
        color: 'red',
        title: 'Error',
        message: "You can't send empty messages",
      });
    }

    setMessageText('');
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  useEffect(() => {
    if (!messages) return;

    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (messageText !== '') {
      socket.emit('typing', {
        isTyping: true,
        room: room,
        name: user?.name,
      });
    } else {
      socket.emit('typing', {
        isTyping: false,
        room: room,
        name: user?.name,
      });
    }
  }, [messageText]);

  return (
    <div className={styles.container}>
      {messages.map((message: IMessage, index: number) => {
        return <Message message={message} key={`message-${index}`} />;
      })}
      {typing.isTyping && (
        <div className={styles.typing_container}>
          <Loader variant='dots' />
          <span>{typing.name}</span>
        </div>
      )}
      <div ref={messagesEndRef} />
      <div className={styles.footer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            sendMessage();
          }}
        >
          <Input
            placeholder='Message'
            className={styles.input}
            value={messageText}
            onChange={(e: any) => setMessageText(e.target.value)}
            rightSection={
              <ActionIcon type='submit' color='blue'>
                <IoMdSend />
              </ActionIcon>
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
