<<<<<<< HEAD
import { useEffect, useState, useContext } from "react";
import NavBarUser from "../components/NavBarUser";
import { SessionContextUser } from "../contexts/SessionContextUser";

const UserProfilePage = () => {
  const { user } = useContext(SessionContextUser);

  // useEffect(() => {}, []);
  // if (currentToken) {
  //     console.log(currentToken);
  // }

  //   const [email, setEmail] = useState();
  //   const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <NavBarUser />

      <div>Profile Page</div>
      <h3>user.firstName</h3>
      <h3>user.lastName</h3>
      <h3>user.email</h3>
      <h3>user.aboutMe</h3>
    </div>
  );
};

export default UserProfilePage;
=======
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
>>>>>>> main
