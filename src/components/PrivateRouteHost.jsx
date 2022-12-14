import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextHost } from "../contexts/SessionContextHost";

function PrivateRouteHost({children}) {
    const {isAuthenticated} = useContext(SessionContextHost)
    return ( isAuthenticated ? <>{children}</> : <Navigate to="/error-page" />);
}
export default PrivateRouteHost;
