import { useAuth0 } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';
import React from 'react';
import { useGlobalStore } from '../../globalStore/globalStore';
import styles from './fullScreenLoad.module.css';

const fullScreenLoad = () => {
  const globalStore = useGlobalStore();
  const { isLoading } = useAuth0();

  return (
    <div>
      {globalStore.isFullLoader ||
        (isLoading && (
          <div className={styles.container}>
            <LoadingOverlay visible={true} overlayBlur={2} />
          </div>
        ))}
    </div>
  );
};

export default fullScreenLoad;
