import { ActionIcon, Menu } from '@mantine/core';

import React from 'react';
import styles from './shareButton.module.css';
import { AiOutlineLink, AiOutlinePrinter } from 'react-icons/ai';
import { MdIosShare } from 'react-icons/md';
import { INote } from '../../../../../interfaces/INote';
import { showNotification } from '@mantine/notifications';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface Props {
  handlePrint: () => void;
  note: INote;
}

const ShareButton = ({ handlePrint, note }: Props) => {
  const navigate = useNavigate();

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `https://${window.location.host}/shared/${note.id}---${note.user_id}`
    );

    showNotification({
      color: 'blue',
      title: 'Link copied',
      message:
        'Share this link to your friends so they can see your horrendous note hehe jk jk',
    });
  };

  const handleCollaborate = () => {
    navigate(`/collaborate/${note.id}---${note.user_id}---${note.folderId}`);
  };

  return (
    <>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <ActionIcon variant='light' color='blue' className={styles.button}>
            <MdIosShare />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Share</Menu.Label>
          <Menu.Item onClick={handleCollaborate} icon={<BsFillPeopleFill />}>
            Collaborate
          </Menu.Item>
          <Menu.Item onClick={copyLinkToClipboard} icon={<AiOutlineLink />}>
            Copy Note Link
          </Menu.Item>
          <Menu.Label>Download Note</Menu.Label>
          <Menu.Item onClick={handlePrint} icon={<AiOutlinePrinter />}>
            Print
          </Menu.Item>
          <Menu.Label>To Download PFD click print and save as PDF</Menu.Label>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ShareButton;
