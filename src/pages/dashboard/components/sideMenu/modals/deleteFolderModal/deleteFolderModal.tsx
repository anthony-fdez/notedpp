import { Alert, Button, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useGlobalStore } from "../../../../../../globalStore/globalStore";
import styles from "./deleteFolderModal.module.css";
import Axios from "axios";
import { showNotification } from "@mantine/notifications";
import { IFolder } from "../../../../../../interfaces/IFolder";

interface Props {
  folder: IFolder;
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteFolderModal = ({
  isOpen,
  handleClose,
  folder,
}: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingDeletingFolder, setIsLoadingDeletingFolder] = useState(false);

  const handleDeleteFolder = () => {
    setIsLoadingDeletingFolder(true);

    Axios.post(
      "http://localhost:3001/notes/delete-folder",
      {
        folder_id: folder.id,
      },
      {
        headers: {
          Authorization: `Bearer ${globalStore.user.token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);

        showNotification({
          title: "Folder Created",
          message: "Your folder was created successfully",
          color: "blue",
        });

        handleClose();
      })
      .catch((e) => {
        if (e.response.data.message) {
          showNotification({
            title: "Error",
            message: e.response.data.message,
            color: "red",
          });
        }

        console.log(e.response);
      })
      .finally(() => {
        setIsLoadingDeletingFolder(false);
      });
  };

  return (
    <Modal
      overlayBlur={3}
      opened={isOpen}
      onClose={handleClose}
      title="Delete Folder"
    >
      <div>
        <Alert variant="filled" title="Be careful" color="red">
          This action is irreversible, and all you notes inside this folder will
          be deleted as well.
        </Alert>
        <div className={styles.footer_container}>
          <Button
            loaderPosition="left"
            loading={isLoadingDeletingFolder}
            color="red"
            variant="outline"
            onClick={handleDeleteFolder}
          >
            Delete Folder
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFolderModal;
