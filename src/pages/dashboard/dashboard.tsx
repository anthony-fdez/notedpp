import React, { useState } from "react";
import { IFolder } from "../../interfaces/IFolder";

const Dashboard = (): JSX.Element | null => {
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [folders, setFolders] = useState<IFolder | null>(null);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
