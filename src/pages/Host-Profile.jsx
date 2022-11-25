import {useContext, useEffect, useState} from "react"
import {SessionContextHost} from "../contexts/SessionContextHost"
import PublishListing from "../components/Publish-Listing";

function HostProfile() {
    const {token, currentToken} = useContext(SessionContextHost);

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
    },[])

    

    return ( 
        <>
        <h1>Welcome to your profile, {currentToken.user.firstName}</h1>
        <PublishListing/>
        <div>
           {listings.map(house=> (
            <div key={house._id}>
                <img src={house.image} alt="house"/>
                <p>Country: {house.country}</p>
                <p>City: {house.city}</p>
                <p>Room type: {house.typeOfRoom}</p>
                <p>Places available: {house.placesAvailable}</p>
                <button>Details </button>
                <button>Remove listing </button>
            </div>
           ))} 
        </div>
        </>
     );
}

export default HostProfile;