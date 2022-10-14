import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";

import LoginButton from "../auth/loginButton/loginButton";
import LogoutButton from "../auth/logoutButton/logoutButton";
import styles from "./header.module.css";

import { TbUser } from "react-icons/tb";
import ProfileDrawer from "../profileDrawer/profileDrawer";

const Header: React.FC = (): JSX.Element => {
  const { user, isAuthenticated } = useAuth0();

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  useEffect(() => {
    console.log(user);
    console.log(isAuthenticated);
  }, [isAuthenticated, user]);

  return (
    <header className={styles.container}>
      <ProfileDrawer
        isOpen={isUserDrawerOpen}
        handleClose={() => setIsUserDrawerOpen(false)}
      />
      <div className={styles.content}>
        <h3>Notes App</h3>
        <div className={styles.header_right_container}>
          <LoginButton />
          <ActionIcon
            className={styles.profile_button}
            size="lg"
            color="blue"
            variant="light"
            onClick={() => setIsUserDrawerOpen(true)}
          >
            <TbUser size={18} />
          </ActionIcon>
        </div>
      </div>
    </header>
  );
};

export default Header;
