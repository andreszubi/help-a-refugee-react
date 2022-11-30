// Create a Publish Listing page using Housing model

import React from 'react';
import NavBar from './NavBar';
import { useState, useContext } from 'react';
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useNavigate } from "react-router-dom";


function PublishListing() {
    const { token, setToken } = useContext(SessionContextHost);
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [typeOfRoom, setTypeOfRoom] = useState("");
    const [ placesAvailable, setPlacesAvailable] = useState("");
    const [ image, setImage] = useState("");
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/host/listings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ country, city, typeOfRoom, placesAvailable, image}),
        });
        const parsed = await response.json();

        if (parsed.status === 200) {
            setToken(parsed.token);
    
        }

    };
    return (
        <div className="PublishListing">

            <div>
                <h1>Publish Listing</h1>
                <form onSubmit={handleSubmit}>
                    
               <label>Country:: <input type="text" name="country" required onChange={event => setCountry(event.target.value)} /></label> 

               <label>City: <input type="text" name="city" required onChange={event => setCity(event.target.value)} /></label>   

                <label>Type of Room: <input type="text" name="typeOfRoom" required onChange={event => setTypeOfRoom(event.target.value)} /></label>

                <label>Places Available: <input type="number" name="placesAvailable" required onChange={event => setPlacesAvailable(event.target.value)} /></label>

                <label>Image: <input type="file" name="image" onChange={event => setImage(event.target.value)} /></label>


                <button className="button" type="submit">Submit</button>

                </form>

                </div>

             </div>
    );
}

export default PublishListing;


    