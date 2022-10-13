import { Button } from "@mantine/core";
import React from "react";
import AnimateOnScreenLoad from "../../components/animateOnScreenLoad/animateOnScreenLoad";
import LoginButton from "../../components/auth/loginButton/loginButtonHome";
import styles from "./home.module.css";
import undrawOne from "./undrawOne.svg";
const Home: React.FC = (): JSX.Element => (
  <AnimateOnScreenLoad>
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Noted++</h1>
        <h2>Just A Note App But Better</h2>
        <p>Better focus. Better understanding. Better organization</p>
        <div className={styles.button}>
          <LoginButton />
        </div>
      </div>
    </div>
  </AnimateOnScreenLoad>
);

export default Home;
