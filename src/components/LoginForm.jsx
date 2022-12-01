import { Alert } from "@mantine/core";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";

const LoginForm = () => {
  const { setToken } = useContext(SessionContextUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();

    if (response.status === 200) {
      setToken(parsed.token);
      navigate("/user-profile");
    } else if (response.status===400 || response.status===404){
      setError(parsed.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error?.message && <p>error.message</p>}
      <h2 className="largeTextForm">Get help now</h2>
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
      {error ? (<Alert title="Bummer!" color="red">
      {error} Please try again!
    </Alert>): ""}
      <button className="button" type="submit">
        Login
      </button>
      <div
        className="signup-btns"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p style={{ width: "20vw" }}>
          Not a member yet? Sign up{" "}
          <Link to={"/user-signup"} className="signUpLink">
            here!
            {/* <p style={{ color: "white" }}>
              <button className="button">Sign up!</button>
            </p> */}
          </Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
