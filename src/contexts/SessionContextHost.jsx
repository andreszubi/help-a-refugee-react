import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const SessionContextHost = createContext();

const SessionContextHostProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [currentPayload, setCurrentPayload] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/host/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parsed = await response.json();
    //console.log(parsed.payload);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setCurrentPayload(parsed.payload)
    }
    setIsLoading(false)
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
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${endpoint}`, {
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
      value={{ token, setToken, isAuthenticated, fetchWithToken , currentPayload, setCurrentPayload, isLoading, setIsLoading}}
    >
      {children}
    </SessionContextHost.Provider>
  );
};

export default SessionContextHostProvider;
