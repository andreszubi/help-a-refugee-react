import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import { Card, Modal, Skeleton, Text } from "@mantine/core";

const UserProfile = () => {
  const { token, currentUser, setCurrentUser } = useContext(SessionContextUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [hashedPassword, setHashedPassword] = useState(has);
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //* GET USER*//
  const loadingTime = () => {
    if (currentUser) {
      const fetchUser = async () => {
        const response = await fetch(
          `http://localhost:5005/user/user/${currentUser.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const parsed = await response.json();
        setEmail(parsed.email);
        setFirstName(parsed.firstName);
        setLastName(parsed.lastName);
        setAboutMe(parsed.aboutMe);
        setImage(parsed.image);
      };
      fetchUser();
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  //*EDIT USER*//
  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const fData = new FormData();
    fData.append("imageUrl", image);
    fData.append("email", email);
    fData.append("firstName", firstName);
    fData.append("lastName", lastName);
    fData.append("aboutMe", aboutMe);
    const response = await fetch(
      `http://localhost:5005/user/user/edit/${currentUser.user._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fData,
      }
    );
    const updatedUser = await response.json();
    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  //* ADD WAITING THINGY*//
  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBarUser />
      {isLoading ? (
          <h2>"Loading..."</h2>
        ) : (
          <div>
            <h2>Welcome to your profile, {currentUser.user.firstName}</h2>
            <img src={currentUser.user.image} alt="user photo" />
          
      <Skeleton visible={isLoading}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text fz="lg">First Name: {currentUser.user.firstName}</Text>
          <Text>Last Name: {currentUser.user.lastName}</Text>
          <Text>Email: {currentUser.user.email}</Text>
          <Text>About me:{currentUser.user.aboutMe}</Text>
          <button
            className="button"
            type="submit"
            onClick={() => setIsEditing(true)}
          >
            Edit profile{" "}
          </button>
        </Card>
      </Skeleton>
      <Modal
        opened={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit profile"
      >
        <form onSubmit={handleSubmit}>
          <label>
            Profile Picture:{" "}
            <input type="file" name="imageUrl" accept="image/png, image/jpg" />
          </label>
          <label>
            First Name :
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name :
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            About me:
            <input
              value={aboutMe}
              onChange={(event) => setAboutMe(event.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Update
          </button>
        </form>
      </Modal>
      </div>)}
    </>
  );
};

export default UserProfile;
