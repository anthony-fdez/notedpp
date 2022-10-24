import { showNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';

interface Props {
  globalStore: IGlobalStore;
  folder_name: string;
  new_folder_name: string;
}

export const renameFolder = async ({
  globalStore,
  folder_name,
  new_folder_name,
}: Props) => {
  await Axios.patch(
    `${import.meta.env.VITE_BASE_URL}/notes/rename-folder`,
    {
      folder_name,
      new_folder_name,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then(() => {
      showNotification({
        title: 'Folder Renamed',
        message: 'Your folder was renamed successfully',
        color: 'blue',
      });

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
