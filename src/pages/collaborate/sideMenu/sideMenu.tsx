import {
  ActionIcon,
  Alert,
  Avatar,
  Button,
  Drawer,
  Input,
  SegmentedControl,
  Tooltip,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { useGlobalStore } from '../../../globalStore/globalStore';
import styles from './sideMenu.module.css';

import { AiOutlineLink, AiOutlineRight } from 'react-icons/ai';
import { showNotification } from '@mantine/notifications';
import { BiImport } from 'react-icons/bi';
import ImportNoteModal from './modals/importNoteModal/importNoteModal';
import Chat from './chat/chat';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import { BiMessageAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';

interface Props {
  provider: WebrtcProvider;
  room: string;
}

export interface IMessage {
  id?: string;
  message: string;
  name: string;
  quotedMessage?: string;
  time?: string;
}

export interface ITyping {
  isTyping: boolean;
  name: string;
}

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const CollaborationSideMenu = ({ provider, room }: Props) => {
  const globalStore = useGlobalStore();
  const awareness = provider.awareness;
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [users, setUsers] = useState<any>(null);
  const [isImportNoteModalOpen, setIsImportNoteModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string>('default');
  const [roomToJoin, setRoomToJoin] = useState('');

  const [typing, setTyping] = useState<ITyping>({ isTyping: false, name: '' });
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    awareness.on('change', () => {
      setUsers(Array.from(awareness.getStates().values()));
    });
  }, [awareness]);

  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);

    showNotification({
      title: 'Link copied to your clipboard',
      message: 'Share it with your friends and work together on this note',
      color: 'blue',
    });
  };

  useEffect(() => {
    if (!user) return;

    socket.emit('join', {
      userName: user.name,
      room: room,
    });
  }, [user, room]);

  const handleLeaveRoom = () => {
    const randomString = (Math.random() + 1).toString(36).substring(6);

    navigate(`/collaborate/${randomString}`);

    window.location.reload();
  };

  useEffect((): any => {
    const onMessage = (data: IMessage) => {
      const message = {
        message: data.message,
        name: data.name,
        id: data.id,
        time: data.time,
        quotedMessage: data.quotedMessage,
      };

      setMessages((messages: IMessage[]) => [...messages, message]);

      if (selectedScreen === 'default') {
        showNotification({
          title: data.name,
          message: data.message,
          color: 'blue',
          onClick: () => setSelectedScreen('chat'),
          icon: <BiMessageAlt />,
        });
      }
    };

    const onTyping = (data: ITyping) => {
      setTyping(data);
    };

    socket.on('message', onMessage);
    socket.on('typing', onTyping);

    return () => socket.off('message', onMessage);
  }, [socket, selectedScreen, room]);

  useEffect(
    () => () => {
      socket.emit('leaveRoom', {
        userName: user?.name,
        room: room,
      });
    },
    [room]
  );

  const defaultScreen = (): JSX.Element | null => {
    if (!users) return null;

    return (
      <>
        <ImportNoteModal
          isOpen={isImportNoteModalOpen}
          handleClose={() => setIsImportNoteModalOpen(false)}
        />
        <Button
          variant='light'
          leftIcon={<BiImport />}
          className={styles.import_note_button}
          onClick={() => setIsImportNoteModalOpen(true)}
        >
          Import Note
        </Button>
        <Button
          variant='light'
          color='red'
          leftIcon={<ImExit />}
          className={styles.import_note_button}
          onClick={() => handleLeaveRoom()}
        >
          Leave Room
        </Button>
        {users.length === 1 && (
          <div className={styles.alone_alert}>
            <Alert title='Feeling alone?'>
              Looks like its only you in the room now, try inviting some friends
              or join their room.
              <p style={{ marginTop: '15px' }}>
                My Room: <strong>{room}</strong>
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/collaborate/${roomToJoin}`);

                  window.location.reload();
                }}
              >
                <Input
                  placeholder='Join a room'
                  onChange={(e: any) => setRoomToJoin(e.target.value)}
                  value={roomToJoin}
                  rightSection={
                    <Tooltip label='Join Room'>
                      <ActionIcon type='submit'>
                        <AiOutlineRight />
                      </ActionIcon>
                    </Tooltip>
                  }
                />
              </form>
              <Button
                onClick={handleCopyRoomLink}
                leftIcon={<AiOutlineLink />}
                className={styles.invite_button}
              >
                Copy my room&apos;s link
              </Button>
            </Alert>
          </div>
        )}
        <p>People ({users.length})</p>

        {users.map((user: any, index: number) => {
          if (!user.user) return null;

          console.log(user);

          return (
            <div className={styles.user_container} key={`user-${index}`}>
              <Avatar
                className={styles.avatar}
                src={user.user.avatar ?? null}
              />
              {user.user.name}
            </div>
          );
        })}
      </>
    );
  };

  const sideMenuContents = () => {
    if (!users) return null;

    return (
      <div>
        <SegmentedControl
          className={styles.segmented_control}
          value={selectedScreen}
          onChange={setSelectedScreen}
          data={[
            { label: 'People', value: 'default' },
            { label: 'Chat', value: 'chat' },
          ]}
        />
        {selectedScreen === 'default' ? (
          defaultScreen()
        ) : (
          <Chat
            socket={socket}
            room={room}
            messages={messages}
            typing={typing}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.mobile_menu}>
        <Drawer
          overlayBlur={5}
          className={styles.drawer}
          lockScroll={false}
          opened={globalStore.isMobileMenuOpen}
          onClose={() => globalStore.setIsMobileMenuOpen(false)}
          title='Noted++'
          padding='xl'
          size='xl'
        >
          {sideMenuContents()}
        </Drawer>
      </div>
      <div className={styles.desktop_menu}>
        <div
          style={{
            borderRight: `1px solid ${
              globalStore.theme === 'dark'
                ? 'rgb(80,80,80)'
                : 'rgb(230,230,230)'
            }`,
          }}
          className={styles.container}
        >
          {sideMenuContents()}
        </div>
      </div>
    </>
  );
};

export default CollaborationSideMenu;
