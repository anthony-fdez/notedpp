import React, { useEffect, useState } from "react";
import { Drawer } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./profileDrawer.module.css";
import LogoutButton from "../auth/logoutButton/logoutButton";
import { MdVerified } from "react-icons/md";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ProfileDrawer = ({ isOpen, handleClose }: Props): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-bbn450zg.us.auth0.com";

      try {
        const token = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        setAccessToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  const renderUserData = () => {
    if (!user) return null;
    if (!isAuthenticated) return null;

    return (
      <div className={styles.container}>
        <div className={styles.image_container}>
          <img
            className={styles.profile_image}
            src={user.picture}
            alt={user.name}
          />
        </div>
        <div className={styles.personal_info}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {user.email_verified && (
            <div className={styles.verified_container}>
              <MdVerified className={styles.verified_icon} />
              <span>Email Verified</span>
            </div>
          )}
        </div>
        <LogoutButton />

        <h1>JWT Token (testing only)</h1>
        {accessToken ? (
          <p style={{ lineBreak: "anywhere" }}>
            {JSON.stringify(accessToken, null, 2)}
          </p>
        ) : (
          "No user metadata defined"
        )}
      </div>
    );
  };

  return (
    <>
      <Drawer
        opened={isOpen}
        position="right"
        overlayBlur={3}
        onClose={handleClose}
        title="Profile"
        padding="xl"
        size="xl"
      >
        {renderUserData()}
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
