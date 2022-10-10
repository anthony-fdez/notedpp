import React from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./headerDesktop.module.css";

const Header: React.FC = (): JSX.Element => (
  <header className={styles.container}>
    <div className={styles.content}>
      <h3>Notes App</h3>
    </div>
  </header>
);

export default Header;
