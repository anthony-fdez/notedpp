import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";

import LoginButton from "../auth/loginButton/loginButton";
import styles from "./header.module.css";

import { TbUser } from "react-icons/tb";
import ProfileDrawer from "../profileDrawer/profileDrawer";

const Header: React.FC = (): JSX.Element => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  return (
    <header className={styles.container}>
      <ProfileDrawer
        isOpen={isUserDrawerOpen}
        handleClose={() => setIsUserDrawerOpen(false)}
      />
      <div className={styles.content}>
        <h3>Noted++</h3>
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
