import { ActionIcon, Menu } from '@mantine/core';

import React from 'react';
import styles from './downloadButton.module.css';
import { AiOutlineDownload, AiOutlinePrinter } from 'react-icons/ai';

interface Props {
  handlePrint: () => void;
}

const DownloadButton = ({ handlePrint }: Props) => {
  return (
    <>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <ActionIcon variant='light' color='blue' className={styles.button}>
            <AiOutlineDownload />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
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

export default DownloadButton;
