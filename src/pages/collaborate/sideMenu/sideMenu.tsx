import { Alert, Avatar, Button, Drawer, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { useGlobalStore } from '../../../globalStore/globalStore';
import styles from './sideMenu.module.css';

import { newShade } from '../../../functions/newShade';
import { AiOutlineLink } from 'react-icons/ai';
import { showNotification } from '@mantine/notifications';

interface Props {
  provider: WebrtcProvider;
}

const CollaborationSideMenu = ({ provider }: Props) => {
  const globalStore = useGlobalStore();
  const awareness = provider.awareness;

  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    awareness.on('change', (changes: any) => {
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

  const sideMenuContents = () => {
    if (!users) return null;

    return (
      <div>
        {users.length === 1 && (
          <div className={styles.alone_alert}>
            <Alert title='Feeling alone?'>
              Looks like its only you in the room now, try inviting some
              friends.
              <Button
                onClick={handleCopyRoomLink}
                leftIcon={<AiOutlineLink />}
                className={styles.invite_button}
              >
                Copy room link
              </Button>
            </Alert>
          </div>
        )}
        <p>People</p>

        {users.map((user: any, index: number) => {
          return (
            <div className={styles.user_container} key={`user-${index}`}>
              <Avatar className={styles.avatar} src={user.user.avatar} />
              {user.user.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={styles.mobile_menu}>
        <Drawer
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
