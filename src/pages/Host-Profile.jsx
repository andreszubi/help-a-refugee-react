import {useContext, useEffect, useState} from "react"
import {SessionContextHost} from "../contexts/SessionContextHost"
import PublishListing from "../components/Publish-Listing";

function HostProfile() {
    const {token, currentToken} = useContext(SessionContextHost);
    const [visibleForm, setVisibleForm] = useState(false)

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
    const deleteListing = async (id, event) => {
        event.preventDefault()
        const response = await fetch (`http://localhost:5005/host/listings/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
       
        })
         const parsed = await response.json()
        fetchListings() 
    }

    const setVisibilityForm = () => {
        setVisibleForm(!visibleForm)}

    useEffect(()=> {
        fetchListings()
        setIsLoading(false)  
    },[])

    

    return ( 
        <div className="background-img">
        <h1>Welcome to your profile, {currentToken.user.firstName}</h1>    
        {visibleForm && <PublishListing/>}
        <button type="button" onClick={setVisibilityForm}>{visibleForm ? "Hide form" : "Add a new listing"}</button>
        <div className="listings">
           {listings.map(({_id, image, country, city, typeOfRoom, placesAvailable})=> (
            <div key={_id} className="listing">
                <img src={image} alt="house" className="listingImage"/>
                <p>Country: {country}</p>
                <p>City: {city}</p>
                <p>Room type: {typeOfRoom}</p>
                <p>Places available: {placesAvailable}</p>
                <button type ="button" onClick={event => deleteListing(_id, event)}>Remove listing</button>
                <button>Check details</button>
            </div>
           ))} 
        </div>
        </div>
     );
}

export default HostProfile;