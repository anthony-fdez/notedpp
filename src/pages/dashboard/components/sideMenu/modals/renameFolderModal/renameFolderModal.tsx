import { Button, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useGlobalStore } from "../../../../../../globalStore/globalStore";
import styles from "../modals.module.css";
import Axios from "axios";
import { showNotification } from "@mantine/notifications";
import { IFolder } from "../../../../../../interfaces/IFolder";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  folder: IFolder;
}

const RenameFolderModal = ({
  isOpen,
  handleClose,
  folder,
}: Props): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isLoadingCreatingFolder, setIsLoadingCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCreatingFolder(true);

    Axios.patch(
      "http://localhost:3001/notes/rename-folder",
      {
        folder_name: folder.folder_name,
        new_folder_name: newFolderName,
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
          title: "Folder Renamed",
          message: "Your folder was renamed successfully",
          color: "blue",
        });

        handleClose();
      })
      .catch((e) => {
        try {
          if (e.response.data.message) {
            showNotification({
              title: "Error",
              message: e.response.data.message,
              color: "red",
            });
          }
        } catch (e) {
          showNotification({
            title: "Error",
            message: "Looks like our servers are down, try again later.",
            color: "red",
          });
        }
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
      title="Rename Folder"
    >
      <form onSubmit={(e) => handleCreateFolder(e)}>
        <Input
          onChange={(e) => {
            setNewFolderName(e.target.value);
          }}
          placeholder="New Folder Name"
          required={true}
          defaultValue={folder.folder_name}
        />
        <div className={styles.footer_container}>
          <Button
            loaderPosition="left"
            loading={isLoadingCreatingFolder}
            type="submit"
          >
            Rename Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RenameFolderModal;
