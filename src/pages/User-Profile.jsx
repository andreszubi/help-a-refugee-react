import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";

function UserProfile() {
  const { token, currentToken } = useContext(SessionContextUser);

  if (currentToken) {
    console.log("Hello", currentToken);
  }

  //   const [listings, setListings] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const fetchListings = async () => {
  //     const response = await fetch("http://localhost:5005/user", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const parsed = await response.json();
  //     setListings(parsed);
  //   };

  //   useEffect(() => {
  //     fetchListings();
  //     setIsLoading(false);
  //   }, []);

  return (
    <>
      <h1>Welcome to your profile, {currentToken.user.firstName}</h1>;
      <h1>First Name: {currentToken.user.firstName} </h1>;
      <h1>Last Name: {currentToken.user.lastName} </h1>;
      <h1>Email: {currentToken.user.email} </h1>;
      <h1>About me: {currentToken.user.aboutMe} </h1>;
    </>
  );
}

export default UserProfile;
