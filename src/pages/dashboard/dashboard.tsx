import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const Dashboard = (): JSX.Element | null => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

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
  }, [getAccessTokenSilently, user?.sub]);

  if (!user) return null;

  return (
    <>
      <h1>Dashboard</h1>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <br></br>

          <h1>JWT Token</h1>
          {accessToken ? (
            <p style={{ maxWidth: "100vw", lineBreak: "anywhere" }}>
              {JSON.stringify(accessToken, null, 2)}
            </p>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
