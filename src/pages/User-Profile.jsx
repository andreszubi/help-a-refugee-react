import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";

function UserProfile() {
  const { currentToken } = useContext(SessionContextUser);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(email.email);
  // const [hashedPassword, setHashedPassword] = useState(has);
  const [firstName, setFirstName] = useState(firstName.firstName);
  const [lastName, setLastName] = useState(lastName.lastName);
  const [image, setImage] = useState(image.image);
  const [aboutMe, setAboutMe] = useState(aboutMe.aboutMe);
  console.log("token", currentToken);
  console.log("Hello");

  const handleSubmit = async;

  //   if (currentToken) {
  //     console.log(currentToken);
  //   }

  return (
    <>
      <NavBarUser />
      <h2>Welcome to your profile, {currentToken.user.firstName}</h2>
      <p>First Name: {currentToken.user.firstName} </p>
      <p>Last Name: {currentToken.user.lastName} </p>
      <p>Email: {currentToken.user.email} </p>
      <p>About me: {currentToken.user.aboutMe} </p>
    </>
  );
}

export default UserProfile;
