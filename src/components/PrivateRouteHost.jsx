import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextHost } from "../contexts/SessionContextHost";

function PrivateRouteHost({children}) {
    const {isAuthenticated, isLoading} = useContext(SessionContextHost)
    
    // Wait for token verification to complete
    if (isLoading) {
        return null;
    }
    
    return ( isAuthenticated ? <>{children}</> : <Navigate to="/error-page" />);
}
export default PrivateRouteHost;
