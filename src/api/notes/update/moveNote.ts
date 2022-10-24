import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';

interface Props {
  globalStore: IGlobalStore;
  note_id: string;
  new_folder_id: string;
}

export const moveNote = async ({
  globalStore,
  new_folder_id,
  note_id,
}: Props) => {
  await Axios.patch(
    `${import.meta.env.VITE_BASE_URL}notes/move-note/`,
    {
      note_id,
      new_folder_id,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then(() => {
      showNotification({
        title: 'Note moved',
        message: 'Your note was moved to your desired folder',
        color: 'blue',
      });

      globalStore.updateFolders();
    })
    .catch((e) => {
      if (e.response.data.message) {
        showNotification({
          title: 'Error',
          message: e.response.data.message,
          color: 'red',
        });
      }
    });
};
