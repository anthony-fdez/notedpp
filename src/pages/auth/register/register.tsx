import React from 'react';
import TextField from '@mui/material/TextField';

import styles from '../auth.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimateOnScreenLoad from '../../../components/animateOnScreenLoad/animateOnScreenLoad';

const RegisterScreen = () => {
  const handleRegister = () => {};

  return (
    <AnimateOnScreenLoad>
      <div className={styles.page_container}>
        <div className={styles.box}>
          <h1>Register</h1>
          <hr className={styles.hr} />
          <TextField
            className={styles.input}
            label="Full Name"
            variant="outlined"
            name="name"
          />
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
            <Link to="/login">
              <Button
                className={styles.button}
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
            </Link>

            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              Register
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

export default RegisterScreen;
