import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import { Card, Modal, Skeleton, Text } from "@mantine/core";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { token, currentUser, setCurrentUser, isLoading, setIsLoading } =
    useContext(SessionContextUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [hashedPassword, setHashedPassword] = useState(has);
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const place = "profile";

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

  return (
    <div className="container">
      <NavBarUser place={place} />
      {isLoading ? (
        <h2>"Loading..."</h2>
      ) : (
        <div>
          <div className="font-link largeTextSignUp">
            <h1>Welcome to your profile, {currentUser.user.firstName}</h1>{" "}
          </div>

          <Skeleton visible={isLoading}>
            <div className="profileFull">
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <div className="profileInfo">
                  <img
                    className="profileImage"
                    src={currentUser.user.image}
                    alt="user photo"
                  />
                  <div className="allProfileText">
                    <Text className="profileText">
                      First Name: {currentUser.user.firstName}
                    </Text>
                    <Text className="profileText">
                      Last Name: {currentUser.user.lastName}
                    </Text>
                    <Text className="profileText">
                      Email: {currentUser.user.email}
                    </Text>
                    <Text className="profileText">
                      About me:
                      {currentUser.user.aboutMe}
                    </Text>
                    <button
                      className="button profButton"
                      type="submit"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit profile{" "}
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </Skeleton>

          <Modal
            opened={isEditing}
            onClose={() => setIsEditing(false)}
            title="Edit profile"
          >
            <form onSubmit={handleSubmit} className="formEdit">
              <label>
                Profile Picture:{" "}
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/png, image/jpg"
                />
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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
