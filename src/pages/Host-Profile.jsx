import {useContext, useEffect, useState} from "react"
import {SessionContextHost} from "../contexts/SessionContextHost"

function HostProfile() {
    const {token, fetchWithToken, currentToken} = useContext(SessionContextHost);
    console.log("the Token", token)
    
    if (currentToken) {console.log("Hello", currentToken)}

    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchListings = async () => {
        const response = await fetch ("http://localhost:5005/host/listings" , {
            method: "GET",
            headers: {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
        })    
        const parsed = await response.json();
        setListings(parsed)
    }

    useEffect(()=> {
        fetchListings()
        setIsLoading(false)
        console.log(listings)
    },[])

    

    return ( 
        <h1>Welcome to your profile, {currentToken.user.firstName}</h1>
     );
}

export default HostProfile;