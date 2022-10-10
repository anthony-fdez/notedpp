import React from "react";
import AnimateOnScreenLoad from "../../components/animateOnScreenLoad/animateOnScreenLoad";
import styles from "./home.module.css";

const Home: React.FC = (): JSX.Element => (
  <AnimateOnScreenLoad>
    <div>
      <h1>Notes App</h1>
    </div>
  </AnimateOnScreenLoad>
);

export default Home;
