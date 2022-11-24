import {useContext, useEffect, useState} from "react"
import {SessionContextHost} from "../contexts/SessionContextHost"

function HostProfile() {
    const {token, fetchWithToken, currentToken} = useContext(SessionContextHost);
    
useEffect(()=> {

  
},[])
if (currentToken) {console.log("Hello", currentToken)}

    const [listings, setListings] = useState([{},{},{}])
    const [isLoading, setIsLoading] = useState(true)
    const fetchListings = fetchWithToken ("GET", "host/listings",setListings)
    

    return ( 
        <h1>Welcome to your profile</h1>
     );
}

export default HostProfile;