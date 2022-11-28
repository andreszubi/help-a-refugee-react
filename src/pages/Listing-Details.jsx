// Create a page that displays all of a housing listing's details when  a user clicks on the listing on the listings search page using the housing properties of city, country, type of room, places available, image and the owner of the listing. They will also be able to book and contact the host from there.
//

import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ListingDetails() {
    const { currentToken } = useContext(SessionContextUser);
    const navigate = useNavigate();

    const [listing, setListing] = useState([]);
    const { id } = useParams();
  
    console.log("token", currentToken);
    console.log("Hello");
    
    useEffect(() => {
        fetch(`http://localhost:3000/listings/${id}`)
        .then((r) => r.json())
        .then((listing) => {
            setListing(listing);
        });
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/listings/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken.token}`,
            },
            body: JSON.stringify({
                listing_id: id,
                user_id: currentToken.user.id,
            }),
        });
        const data = await response.json();
        console.log(data);
        navigate("/bookings");
    };

    const handleMessage = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/messages/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken.token}`,
            },
            body: JSON.stringify({
                listing_id: id,
                user_id: currentToken.user.id,
            }),
        });
        const data = await response.json();
        console.log(data);
        navigate(`/messages/${id}`);
    };





    
    return (
        <>
        <NavBarUser />
        <div className="background-img">
            <div className="listing">
        <h2>Listing Details</h2>
        <img src={listing.image} alt="house" className="listingImage" />
        <p>City: {listing.city}</p>
        <p>Country: {listing.country} </p>
        <p>Type of Room: {listing.typeOfRoom} </p>
        <p>Places Available: {listing.placesAvailable} </p>
        <p>Image: {listing.image} </p>
        <p>Owner: {listing.owner} </p>
        <button className="button" type="submit"  onClick={handleMessage}>Message the host</button>
        <button className="button" onClick={handleSubmit}>Book</button>
        </div>
        </div>
        </>
    );
    }

export default ListingDetails;