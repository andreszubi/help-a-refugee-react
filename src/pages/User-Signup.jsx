import NavBar from "../components/NavBar";
import { useState } from "react";

function UserSignup() {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();
    console.log(parsed);
  };

  return (
    <div className="Refugee-Signup">
      <NavBar />

      <h1>User Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            name="hashedPassword"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <label>
          First Name: <input type="text" name="firstName" />
        </label>

        <label>
          Last Name: <input type="text" name="lastName" />
        </label>

        <label>
          Profile Picture: <input type="file" name="image" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserSignup;
