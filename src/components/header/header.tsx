import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import styles from "./headerDesktop.module.css";

const Header: React.FC = (): JSX.Element => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    console.log(user);
    console.log(isAuthenticated);
  }, [isAuthenticated, user]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h3>Notes App</h3>
        <div>
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
