import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';
import { INote } from '../../../interfaces/INote';

interface Props {
  globalStore: IGlobalStore;
  note_id: string;
}

export const getNoteHistory = async ({
  globalStore,
  note_id,
}: Props): Promise<INote[] | null> => {
  const noteHistory = await Axios.post(
    `${import.meta.env.VITE_BASE_URL}/notes/get-note-history`,
    {
      note_id,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then((response) => {
      return response.data.noteHistory;
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

  return noteHistory;
};
