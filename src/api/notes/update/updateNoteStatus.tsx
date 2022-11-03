import React from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import Axios from 'axios';
import { IGlobalStore } from '../../../globalStore/globalStore';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface Props {
  globalStore: IGlobalStore;
  note_id: string;
  status: string;
}

export const updateNoteStatus = async ({
  globalStore,
  status,
  note_id,
}: Props) => {
  showNotification({
    id: 'Update Status',
    loading: true,
    title: 'Changing note status',
    message: null,
  });

  await Axios.patch(
    `${import.meta.env.VITE_BASE_URL}notes/update-status/`,
    {
      note_id,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${globalStore.user?.token || ''}`,
      },
    }
  )
    .then(() => {
      updateNotification({
        id: 'Update Status',
        loading: false,
        title: 'Status Updated',
        message: null,
        color: 'blue',
        icon: <AiOutlineCheckCircle />,
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
