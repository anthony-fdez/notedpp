import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";

import LoginButton from "../auth/loginButton/loginButton";
import styles from "./header.module.css";

import { TbUser } from "react-icons/tb";
import ProfileDrawer from "../profileDrawer/profileDrawer";
import { FiMenu } from "react-icons/fi";
import { useGlobalStore } from "../../globalStore/globalStore";

const Header: React.FC = (): JSX.Element => {
  const globalStore = useGlobalStore();

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  return (
    <header className={styles.container}>
      <ProfileDrawer
        isOpen={isUserDrawerOpen}
        handleClose={() => setIsUserDrawerOpen(false)}
      />
      <div className={styles.content}>
        <ActionIcon
          onClick={() => globalStore.setIsMobileMenuOpen(true)}
          className={styles.action_icon_mobile_menu}
        >
          {<FiMenu />}
        </ActionIcon>
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
