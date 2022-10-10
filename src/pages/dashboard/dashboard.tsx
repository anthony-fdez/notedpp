import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const Dashboard = (): JSX.Element | null => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

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
            <p style={{ lineBreak: "anywhere" }}>
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

//  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhPdWg5b1owUklhdjN1SG96OHdHQiJ9.eyJpc3MiOiJodHRwczovL2Rldi1iYm40NTB6Zy51cy5hdXRoMC5jb20vIiwic3ViIjoiT3hmMWk4d3k1Y2FzcDVWTlBwS2hzZWQwcHJZZVBaUDVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbm90ZXNBcHBBcGkuY29tIiwiaWF0IjoxNjY1NDM2NTQwLCJleHAiOjE2NjU1MjI5NDAsImF6cCI6Ik94ZjFpOHd5NWNhc3A1Vk5QcEtoc2VkMHByWWVQWlA1IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.CniAwufkbwK929wHUDkkmlkBWQ8bAYFKEFHh0j3fbryTfqlsPbwNvpNO_JjlPSQZE1Jhr1-E5CU0mH3-BrBSo6VKrcoRMwz3GU_rSM6hUrIrvhlcb6NZm_FEip7Z-vE2Uqy8W77u5usndJ3-48gYFp2Cfeb_4bT1Bj1EZgPeGk_EKZq0KiHwuzCu5711WPcIveqvvWuEmcJ-hUlqY4GGEJLzAkhlEKhTESLpja7_Mm5x-mVNNDSTy2pJ2EMacn0dfeLWAJ3JJ1eL9Nb4fxxQCRzbLXqUfOyXQpk3Z58tNopfjHlYtP1Rc6VCXFPz2zL5ERnXVXCe4sjJ0Q-Yg_zG3g",
