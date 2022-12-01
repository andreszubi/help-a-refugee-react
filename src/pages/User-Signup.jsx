import NavBarMain from "../components/NavBarMain";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Alert } from "@mantine/core";

function UserSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const fData = new FormData();
    fData.append("imageUrl", image);
    fData.append("email", email);
    fData.append("password", password);
    fData.append("firstName", firstName);
    fData.append("lastName", lastName);
    fData.append("aboutMe", aboutMe);
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/user/signup`,
      {
        method: "POST",
        body: fData,
      }
    );
    const parsed = await response.json();
    if (response.status === 405) {
      setErrorMessage(parsed.message);
    } else if (response.status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="appContainer">
      <NavBarMain />
      <div className="transbox2">
        <h1 className="textBox font-link largeTextSignUp ">Need help?</h1>{" "}
        <h2 className="mediumTextSignUp">
          Sign up as an user and start looking for a host
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="signUpForm"
        >
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="hashedPassword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            About me:{" "}
            <input
              type="text"
              name="aboutMe"
              value={aboutMe}
              onChange={(event) => setAboutMe(event.target.value)}
            />
          </label>
          <label>
            Profile Picture:{" "}
            <input type="file" name="imageUrl" accept="image/png, image/jpg" />
          </label>
          {errorMessage ? (
            <Alert title="Bummer!" color="red">
              {errorMessage} Please try again!
            </Alert>
          ) : (
            ""
          )}
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="background-img2"></div>
      <Footer />
    </div>
  );
}

export default UserSignup;
