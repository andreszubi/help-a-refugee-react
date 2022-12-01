import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { Loader } from "@mantine/core";

function PrivateRouteHost({ children }) {
  const { isAuthenticated, isLoading } = useContext(SessionContextHost);
  console.log({ isAuthenticated });
  console.log({ isLoading });
  if (isLoading) {
    return (
      <div>
        <Loader color="grape" />
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/host-login" />;
}
export default PrivateRouteHost;
