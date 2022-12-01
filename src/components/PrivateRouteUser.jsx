import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { Loader } from "@mantine/core";

function PrivateRouteUser({ children }) {
  const { isAuthenticated } = useContext(SessionContextUser);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
export default PrivateRouteUser;
