import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const SessionContextHost = createContext();

const SessionContextHostProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [currentToken, setCurrentToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    const response = await fetch("http://localhost:5005/host/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parsed = await response.json();
    console.log(parsed.payload);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setCurrentToken(parsed.payload)
    }
  };
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  function fetchWithToken(method, endpoint, callback, body = null) {
    async () => {
      const response = await fetch(`http://localhost:5005/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });
      const parsed = await response.json();
      callback(parsed);
    };
  }

  return (
    <SessionContextHost.Provider
      value={{ token, setToken, isAuthenticated, fetchWithToken , currentToken}}
    >
      {children}
    </SessionContextHost.Provider>
  );
};

export default SessionContextHostProvider;
