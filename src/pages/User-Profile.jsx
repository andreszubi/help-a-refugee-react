import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";

function UserProfile() {
  const { currentToken } = useContext(SessionContextUser);
  console.log("token", currentToken);
  console.log("Hello");

  //   if (currentToken) {
  //     console.log(currentToken);
  //   }

  return (
    <>
      <h1>Welcome to your profile, {currentToken.user.firstName}</h1>
      <h1>First Name: {currentToken.user.firstName} </h1>
      <h1>Last Name: {currentToken.user.lastName} </h1>
      <h1>Email: {currentToken.user.email} </h1>
      <h1>About me: {currentToken.user.aboutMe} </h1>
    </>
  );
}

export default UserProfile;
