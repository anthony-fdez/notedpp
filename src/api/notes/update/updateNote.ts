import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';

interface Props {
  globalStore: IGlobalStore;
  note_id: string;
  new_note: string;
}

export const updateNote = async ({ globalStore, note_id, new_note }: Props) => {
  await Axios.patch(
    `${import.meta.env.VITE_BASE_URL}/notes/edit-note`,
    {
      new_note,
      note_id,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then(() => {
      //
    })
    .catch((e) => {
      if (e.response.data.message) {
        showNotification({
          title: 'Error',
          message: e.response.data.message,
          color: 'red',
        });
      } else {
        showNotification({
          title: 'Error',
          message: e.response.request.statusText,
          color: 'red',
        });
      }
    });
};
