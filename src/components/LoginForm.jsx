import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContextUser";

const LoginForm = () => {
  const { setToken } = useContext(SessionContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();

    if (parsed.status === 200) {
      setToken(parsed.token);
      Navigate("/user-profile");
    } else {
      setError(parsed);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error?.message && <p>error.message</p>}
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button className="button" type="submit">
        Login
      </button>
      <div
        className="signup-btns"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p style={{ width: "20vw" }}>Not a member yet? </p>
        <Link to="/user-signup">
          <a style={{ color: "white" }}>
            <button className="button">Sign up!</button>
          </a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
