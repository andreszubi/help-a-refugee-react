import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { Loader } from "@mantine/core";

function PrivateRouteUser({ children }) {
  const { isAuthenticated, isLoading } = useContext(SessionContextUser);
  console.log({ isAuthenticated });
  console.log({ isLoading });
  if (isLoading) {
    return (
      <div>
        <Loader color="grape" />
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
export default PrivateRouteUser;
