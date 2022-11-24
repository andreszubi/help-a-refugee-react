import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useState, useContext } from "react";

function HostLogin() {
  const { setToken } = useContext(SessionContextHost);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/host/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();

    if (parsed.status === 200) {
      setToken(parsed.token);
      navigate("/host-profile");
    } else {
      setError(parsed);
    }
  };
  return (
    <div className="HostLogin">
      <NavBar />

      <div className="background-img">
        <h1>Host Login</h1>
        <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default HostLogin;
