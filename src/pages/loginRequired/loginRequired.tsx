import React from 'react';
import LoginButton from '../../components/auth/loginButton/loginButton';
import styles from './loginRequired.module.css';

const LoginRequired = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src='/login.svg' />
      <h1>Hmm... looks like you are not logged in.</h1>
      <p>
        You have to login to be able to access the page you were looking for
      </p>

      <div style={{ marginTop: '20px' }}>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginRequired;
