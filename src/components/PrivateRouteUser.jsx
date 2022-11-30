import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";

function PrivateRouteUser({ children }) {
  const { isAuthenticated, isLoading } = useContext(SessionContextUser);
  console.log({ isAuthenticated });
  console.log({ isLoading });
  if (isLoading) {
    return <h1>Is Loading...</h1>;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
export default PrivateRouteUser;
