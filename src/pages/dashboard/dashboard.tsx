import React, { useEffect, useState } from "react";
import { IFolder } from "../../interfaces/IFolder";
import Axios from "axios";
import { useGlobalStore } from "../../globalStore/globalStore";

const Dashboard = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [folders, setFolders] = useState<IFolder | null>(null);

  useEffect(() => {
    setIsLoadingNotes(true);

    Axios.get("http://localhost:3001/notes/get-all-folders", {
      headers: {
        Authorization: `Bearer ${globalStore.user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
