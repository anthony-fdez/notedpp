import { Alert, Avatar, Button, Drawer, SegmentedControl } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { useGlobalStore } from '../../../globalStore/globalStore';
import styles from './sideMenu.module.css';

import { AiOutlineLink } from 'react-icons/ai';
import { showNotification } from '@mantine/notifications';
import { BiImport } from 'react-icons/bi';
import ImportNoteModal from './modals/importNoteModal/importNoteModa';
import Chat from './chat/chat';

interface Props {
  provider: WebrtcProvider;
}

const CollaborationSideMenu = ({ provider }: Props) => {
  const globalStore = useGlobalStore();
  const awareness = provider.awareness;

  const [users, setUsers] = useState<any>(null);
  const [isImportNoteModalOpen, setIsImportNoteModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string>('default');

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

  const defaultScreen = () => {
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
        {selectedScreen === 'default' ? defaultScreen() : <Chat />}
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
