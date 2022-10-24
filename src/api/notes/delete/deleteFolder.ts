import { IGlobalStore } from '../../../globalStore/globalStore';
import Axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface Props {
  globalStore: IGlobalStore;
  folder_id: string;
}

export const deleteFolder = async ({ globalStore, folder_id }: Props) => {
  await Axios.post(
    `${import.meta.env.VITE_BASE_URL}/notes/delete-folder`,
    {
      folder_id,
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
        color: 'red',
      });

      if (
        globalStore.selectedNote &&
        globalStore.selectedNote.folderId === folder_id
      ) {
        globalStore.setSelectedNote(null);
      }

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
