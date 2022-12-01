import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";

function PrivateRouteUser({ children }) {
  const { isAuthenticated } = useContext(SessionContextUser);
  return isAuthenticated ? <>{children}</> : <Navigate to="/error-page" />;
}
export default PrivateRouteUser;
