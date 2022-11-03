import { Box, Text } from '@mantine/core';
import moment from 'moment';
import React from 'react';
import { getNoteTitle } from '../../../../../functions/getNoteTitle';
import { INote } from '../../../../../interfaces/INote';
import NoteItemMenu from '../noteItemMenu/noteItemMenu';
import styles from './noteItem.module.css';

interface Props {
  note: INote;
}

const NoteItemFolderDashboard = ({ note }: Props) => {
  return (
    <NoteItemMenu note={note}>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
        className={styles.container}
      >
        <h3>{getNoteTitle({ note: note.note })}</h3>
        <Text align='end' size={12} color='dimmed'>
          Edited: {moment(note.updatedAt).fromNow()}
        </Text>
        <Box className={styles.bottom_fade} />
      </Box>
    </NoteItemMenu>
  );
};

export default NoteItemFolderDashboard;
