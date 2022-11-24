import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBarUser from "../components/NavBarUser";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { NavLink } from "react-router-dom";

const UserProfilePage = () => {
  const { isAuthenticated } = useContext(SessionContextUser);

  return (
    <>
      <NavBarUser />
      <div>ProfilePage</div>
    </>
  );
};

export default UserProfilePage;
