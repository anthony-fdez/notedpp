import { LoadingOverlay } from '@mantine/core';
import React from 'react';
import { useGlobalStore } from '../../globalStore/globalStore';
const fullScreenLoad = () => {
  const globalStore = useGlobalStore();
  //  AN EXAMPLE ONCLICK FUNCTION WHICH SHOWS THE FULL SCREEN ON LOADER
  //   const handleClick = () => {
  //     globalStore.setIsFullLoader(!globalStore.isFullLoader);
  //   };
  return (
    <div>
      {globalStore.isFullLoader && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            top: 0,
            position: 'absolute',
            zIndex: '9999',
          }}
        >
          <LoadingOverlay visible={true} overlayBlur={2} />
        </div>
      )}
      {/* <button onClick={handleClick}>Click</button> */}
    </div>
  );
};

export default fullScreenLoad;
