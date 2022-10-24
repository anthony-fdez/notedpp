import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';
import { INote } from '../../../interfaces/INote';

interface Props {
  note_id: string;
  user_id: string;
}

export const getSharedNote = async ({
  note_id,
  user_id,
}: Props): Promise<INote | null> => {
  const note = await Axios.post('http://localhost:3001/notes/get-note-shared', {
    note_id,
    user_id,
  })
    .then((response) => {
      return response.data.note;
    })
    .catch((e): void => {
      try {
        if (e.response.data.message) {
          showNotification({
            title: 'Error',
            message: e.response.data.message,
            color: 'red',
          });
        }
      } catch (e) {
        showNotification({
          title: 'Error',
          message: 'Looks like our servers are down, try again later.',
          color: 'red',
        });
      }
    });

  return note;
};
