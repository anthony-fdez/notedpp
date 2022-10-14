import * as React from 'react';
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';

export default function BackdropSpinner() {
  const { isLoading } = useAuth0();

  return (
    <div>
      <div style={{ width: 500, position: 'relative' }}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
      </div>
    </div>
  );
}
