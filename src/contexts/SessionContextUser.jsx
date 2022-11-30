import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const SessionContextUser = createContext();

const SessionContextUserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parsed = await response.json();
    // console.log(parsed.payload);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setCurrentUser(parsed.payload);
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
    <SessionContextUser.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        fetchWithToken,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </SessionContextUser.Provider>
  );
};

export default SessionContextUserProvider;
