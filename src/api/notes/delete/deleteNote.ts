import { IGlobalStore } from '../../../globalStore/globalStore';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface Props {
  globalStore: IGlobalStore;
  note_id: string;
}

export const deleteNote = async ({ globalStore, note_id }: Props) => {
  await Axios.post(
    `${import.meta.env.VITE_BASE_URL}notes/delete-note/`,
    {
      note_id,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token}`,
      },
    }
  )
    .then(() => {
      showNotification({
        title: 'Note Deleted',
        message: 'Your note was deleted successfully',
        color: 'blue',
      });

      if (globalStore.selectedNote && globalStore.selectedNote.id === note_id) {
        globalStore.setSelectedNote(null);
      }

      globalStore.updateFolders();
    })
    .catch((e) => {
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
};
