import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import {
  ActionIcon,
  Autocomplete,
  Button,
  Card,
  createStyles,
  Modal,
  Skeleton,
  Text,
} from "@mantine/core";
// import { DialogBody } from "@mantine/core/lib/Dialog/Dialog";

const UserProfile = () => {
  const { token, currentPayload } = useContext(SessionContextUser);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(currentPayload.user.email);
  // const [hashedPassword, setHashedPassword] = useState(has);
  const [firstName, setFirstName] = useState(currentPayload.user.firstName);
  const [lastName, setLastName] = useState(currentPayload.user.lastName);
  const [image, setImage] = useState(image.image);
  const [aboutMe, setAboutMe] = useState(currentPayload.user.aboutMe);
  const [isLoading, setIsLoading] = useState(true);
  console.log("token", currentToken);
  console.log("Hello");

  const loadingTime = () => {
    if (currentPayload) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5005/user/edit/:id", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, firstName, lastName, image, aboutMe }),
    });
    setIsEditing(false);
  };

  //   if (currentToken) {
  //     console.log(currentToken);
  //   }

  return (
    <>
      <NavBarUser />
      <h2>Welcome to your profile, {currentToken.user.firstName}</h2>
      <Skeleton visible={isLoading}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text fz="lg">{currentToken.user.firstName}</Text>
          <Text>{currentToken.user.lastName}</Text>
          <Text>{currentToken.user.email}</Text>
          <Text>{currentToken.user.aboutMe}</Text>
          <Button
            color="grape"
            radius="xl"
            size="xs"
            compact
            uppercase
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          {/* <ActionIcon
            color="red"
            size="lg"
            radius="xs"
            variant="light"
            onClick={() => deleteBeer(beer._id)}
          >
            <IconTrash size={26} />
          </ActionIcon> */}
        </Card>
      </Skeleton>
      <Autocomplete
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={["React", "Angular", "Svelte", "Vue"]}
      />
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
          <button type="submit">Update</button>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;
