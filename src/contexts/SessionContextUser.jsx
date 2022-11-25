import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const SessionContextUser = createContext();

const SessionContextUserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [currentPayload, setCurrentPayload] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    const response = await fetch("http://localhost:5005/user/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parsed = await response.json();
    // console.log(parsed.payload);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setCurrentPayload(parsed.payload);
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
    <SessionContextUser.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        fetchWithToken,
        currentPayload,
      }}
    >
      {children}
    </SessionContextUser.Provider>
  );
};

export default SessionContextUserProvider;
