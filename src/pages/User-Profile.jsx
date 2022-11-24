import React, { useEffect } from "react";
import axios from "axios";
import NavBarUser from "../components/NavBarUser";
import { SessionContextUser } from "../contexts/SessionContextUser";

function ProfilePage() {
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");
      let verifyRes = await axios.get(`http://localhost:5005/auth/verify`, {
        headers: { authorization: `Bearer ${storedToken}` },
      });
      console.log("profile page", verifyRes.data);
    };
    verifyUser();
  }, [])
  return (
    <NavBarUser />

  ) 
<div>ProfilePage</div>
}

export default ProfilePage;
