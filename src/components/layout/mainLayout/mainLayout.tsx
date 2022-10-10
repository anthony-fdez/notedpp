import React from "react";
import AnimateOnScreenLoad from "../../animateOnScreenLoad/animateOnScreenLoad";
import Header from "../../header/header";
import styles from "./mainLayout.module.css";

interface Props {
  children: JSX.Element;
}

const MainLayout = ({ children }: Props) => (
  <>
    <Header />
    <div className={styles.children_container}>{children}</div>
  </>
);

export default MainLayout;
