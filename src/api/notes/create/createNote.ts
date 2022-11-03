import { IGlobalStore } from '../../../globalStore/globalStore';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface Props {
  globalStore: IGlobalStore;
  note: string;
  folder_name?: string;
}

export const createNote = async ({ globalStore, note, folder_name }: Props) => {
  await Axios.post(
    `${import.meta.env.VITE_BASE_URL}notes/new-note/`,
    {
      note,
      folder_name,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token}`,
      },
    }
  )
    .then((response) => {
      showNotification({
        title: 'Quick note created',
        message: 'Your quick note was added to the quick notes folder',
        color: 'blue',
      });

      globalStore.updateFolders();
      globalStore.setSelectedNote(response.data.note);
      globalStore.setIsFolderDashboard(null);
    })
    .catch((e) => {
      console.log(e);
      try {
        if (e.response.data.message) {
          showNotification({
            title: 'Error',
            message: e.response.data.message,
            color: 'red',
          });
        }
      } catch (error: unknown) {
        showNotification({
          title: 'Error',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: error.response.request.statusText || 'Internal server error',
          color: 'red',
        });
      }
    });
};
