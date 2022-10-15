import React from "react";
import Header from "../../header/header";
import styles from "./mainLayout.module.css";

interface Props {
  children: JSX.Element;
}

const MainLayout = ({ children }: Props): JSX.Element => (
  <>
    <Header />
    <div className={styles.children_container}>{children}</div>
  </>
);

export default MainLayout;
