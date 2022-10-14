import { Alert, Button, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useGlobalStore } from "../../../../../../globalStore/globalStore";
import styles from "../modals.module.css";
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
  const [confirmFolderName, setConfirmFolderName] = useState("");

  const handleDeleteFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      .then(() => {
        showNotification({
          title: "Folder Created",
          message: "Your folder was created successfully",
          color: "blue",
        });

        if (
          globalStore.selectedNote &&
          globalStore.selectedNote.folderId === folder.id
        ) {
          globalStore.setSelectedNote(null);
        }

        globalStore.updateFolders();

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
      <form onSubmit={(e) => handleDeleteFolder(e)}>
        <Alert variant="filled" title="Be careful" color="red">
          This action is irreversible, and all you notes inside this folder will
          be deleted as well.
        </Alert>
        <Alert color="red" className={styles.confirm_alert}>
          Type <strong>&apos;{folder.folder_name}&apos;</strong> to confirm
          deleting the folder.
        </Alert>
        <Input
          onChange={(e) => setConfirmFolderName(e.target.value)}
          placeholder="Confirm folder name"
        />
        <div className={styles.footer_container}>
          <Button
            disabled={confirmFolderName !== folder.folder_name}
            loaderPosition="left"
            loading={isLoadingDeletingFolder}
            color="red"
            variant="outline"
            type="submit"
          >
            Delete Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteFolderModal;
