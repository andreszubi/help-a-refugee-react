import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSignup() {
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        // img: image,
        aboutMe,
      }),
    });
    const parsed = await response.json();
    console.log(parsed);
    navigate("/");
  };

  return (
    <div className="Refugee-Signup">
      <NavBar />

      <div className="background-img">
        <h1>User Signup</h1>
        <form onSubmit={handleSubmit}>
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

          {/* <label>
            Profile Picture:{" "}
            <input
              type="file"
              name="image"
              value={profileImage}
              onChange={(event) => setProfileImage(event.target.value)}
            />
          </label> */}

          <label>
            About me:{" "}
            <input
              type="text"
              name="aboutMe"
              value={aboutMe}
              onChange={(event) => setAboutMe(event.target.value)}
            />
          </label>

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
