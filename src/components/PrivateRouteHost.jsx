import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContextHost } from "../contexts/SessionContextHost";

function PrivateRouteHost({children}) {
    const {isAuthenticated, isLoading} = useContext(SessionContextHost)
    //console.log({isAuthenticated})
    //console.log({isLoading})
    if(isLoading) {
        return (<h1>Is Loading...</h1>)
    }
    return ( isAuthenticated ? <>{children}</> : <Navigate to="/host-login" />);
}
export default PrivateRouteHost;