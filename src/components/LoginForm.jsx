import { Alert } from "@mantine/core";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SessionContextUser } from "../contexts/SessionContextUser";

const LoginForm = () => {
  const { setToken, isAuthenticated } = useContext(SessionContextUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const navigate = useNavigate();

  // Watch for authentication state change and redirect when authenticated
  useEffect(() => {
    if (shouldRedirect && isAuthenticated) {
      navigate("/listings-search");
    }
  }, [shouldRedirect, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const parsed = await response.json();

      if (response.status === 200) {
        // Set the token - this will trigger the context to verify and set isAuthenticated
        setToken(parsed.token);
        // Flag that we want to redirect once authenticated
        setShouldRedirect(true);
      } else if (response.status === 400 || response.status === 404) {
        setError(parsed.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="largeTextForm">Need Help?</h2>
      <p style={{ 
        color: '#334155', 
        fontSize: '0.95rem', 
        marginBottom: '1.5rem', 
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
      }}>
        Sign in to find a safe place to stay
      </p>
      
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="your@email.com"
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
          placeholder="Your password"
        />
      </label>

      {error && (
        <Alert title="Error" color="red" className="my-3">
          {error}
        </Alert>
      )}

      <motion.button 
        className="button" 
        type="submit"
        disabled={isLoading}
        style={{ width: '100%', marginTop: '0.5rem' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </motion.button>

      <p style={{ 
        color: '#334155', 
        textAlign: 'center', 
        marginTop: '1.25rem', 
        fontSize: '0.9rem',
        textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
      }}>
        New here?{" "}
        <Link to="/user-signup" className="signUpLink">
          Create an account
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;
