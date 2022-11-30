import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useState, useContext } from "react";
import Footer from "../components/Footer";

function HostLogin() {
  const { setToken } = useContext(SessionContextHost);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/host/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const parsed = await response.json();

    if (parsed.status === 200) {
      setToken(parsed.token);
      navigate("/host-profile");
    } else {
      setError(parsed);
    }
  };
  return (
    <div className="container">
      <NavBar />
      <div className="transbox2">
        <h1 className="textBox font-link largeTextSignUp ">Log in as a host</h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <label>
            Email{" "}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Password{" "}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="background-img2"></div>
      <Footer />
    </div>
  );
}

export default HostLogin;
