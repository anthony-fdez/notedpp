import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';

interface Props {
  globalStore: IGlobalStore;
  folder_name: string;
}

export const createFolder = async ({ globalStore, folder_name }: Props) => {
  await Axios.post(
    `${import.meta.env.VITE_BASE_URL}notes/new-folder/`,
    {
      folder_name,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then(() => {
      showNotification({
        title: 'Folder Deleted',
        message: 'Your folder was deleted successfully',
        color: 'blue',
      });

      globalStore.updateFolders();
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
};
