import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextUser } from "../contexts/SessionContextUser";

function PrivateRouteUser({ children }) {
  const { isAuthenticated, isLoading } = useContext(SessionContextUser);
  
  // Wait for token verification to complete
  if (isLoading) {
    return null;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/error-page" />;
}
export default PrivateRouteUser;
