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
  // const [image, setImage] = useState(image.image);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //* GET USER*//
  const loadingTime = () => {
    if (currentUser.user._id) {
      const fetchUser = async () => {
        const response = await fetch(
          `http://localhost:5005/user/${currentUser.user._id}`,
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
    const response = await fetch(
      `http://localhost:5005/user/edit/${currentUser.user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, firstName, lastName, aboutMe }),
      }
    );
    const updatedUser = await response.json();
    console.log(updatedUser);
    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  //*DELETE USER*//
  // const deleteUser = async (id, event) => {
  //   event.preventDefault();
  //   const response = await fetch(
  //     `http://localhost:5005/user/user/${currentUser.user._id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const parsed = await response.json();
  //   navigate("/");
  // };

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
      <h2>
        {isLoading
          ? "Loading..."
          : `Welcome to your profile, ${currentUser.user.firstName}`}
      </h2>
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
          {/* <button
            className="button"
            type="submit"
            onClick={(event) => deleteUser(currentUser.user._id, event)}
          >
            Delete profile
          </button> */}
        </Card>
      </Skeleton>
      <Modal
        opened={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit profile"
      >
        <form onSubmit={handleSubmit}>
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
    </>
  );
};

export default UserProfile;
