import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScreenLoad from '../../../components/animateOnScreenLoad/animateOnScreenLoad';

import styles from '../auth.module.css';

const LoginScreen = () => {
  const handleLogin = () => {};

  return (
    <AnimateOnScreenLoad>
      <div className={styles.page_container}>
        <div className={styles.box}>
          <h1>Login</h1>
          <hr className={styles.hr} />
          <TextField
            className={styles.input}
            label="Email"
            type="email"
            variant="outlined"
          />
          <TextField
            className={styles.input}
            label="Password"
            type="password"
            variant="outlined"
          />
          <div className={styles.footer}>
            <Link to="/register">
              <Button
                className={styles.button}
                variant="outlined"
                color="primary"
              >
                Register
              </Button>
            </Link>

            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
          <br></br>
          <hr className={styles.hr} />
          <div className={styles.back_home}>
            <Link to="/">Back Home</Link>
          </div>
        </div>
      </div>
    </AnimateOnScreenLoad>
  );
};

export default LoginScreen;
