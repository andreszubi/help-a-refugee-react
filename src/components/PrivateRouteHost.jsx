import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { Loader } from "@mantine/core";

function PrivateRouteHost({children}) {
    const {isAuthenticated} = useContext(SessionContextHost)
    return ( isAuthenticated ? <>{children}</> : <Navigate to="/host-login" />);
}
export default PrivateRouteHost;
