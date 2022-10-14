import { Button, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useGlobalStore } from "../../../../../globalStore/globalStore";
import styles from "./newFolderModal.module.css";
import Axios from "axios";
import { showNotification } from "@mantine/notifications";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const NewFolderModal = ({ isOpen, handleClose }: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingCreatingFolder, setIsLoadingCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCreatingFolder(true);

    Axios.post(
      "http://localhost:3001/notes/new-folder",
      {
        folder_name: folderName,
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
        setIsLoadingCreatingFolder(false);
      });
  };

  return (
    <Modal
      overlayBlur={3}
      opened={isOpen}
      onClose={handleClose}
      title="Create new folder"
    >
      <form onSubmit={(e) => handleCreateFolder(e)}>
        <Input
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
          placeholder="Folder Name"
          required={true}
        />
        <div className={styles.footer_container}>
          <Button
            loaderPosition="left"
            loading={isLoadingCreatingFolder}
            type="submit"
          >
            Create Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewFolderModal;
