// Create a Publish Listing page using Housing model

import React from 'react';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { SessionContextHost } from "../contexts/SessionContextHost";


function PublishListing() {
    const { token, setToken } = useContext(SessionContextHost);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [typeOfRoom, setTypeOfRoom] = useState("");
    const [ placesAvailable, setPlacesAvailable] = useState("");
    const [ image, setImage] = useState("");
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5005/host/listings", {
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
            <NavBar />

            <div className="background-img">
                <h1>Publish Listing</h1>
                <form onSubmit={handleSubmit}>
                    
               <label>Country: <input type="text" name="country" required onChange={event => setCountry(event.target.value)} /></label> 

               <label>City: <input type="text" name="city" required onChange={event => setCity(event.target.value)} /></label>   

                <label>Type of Room: <input type="text" name="typeOfRoom" required onChange={event => setTypeOfRoom(event.target.value)} /></label>

                <label>Places Available: <input type="number" name="placesAvailable" required onChange={event => setPlacesAvailable(event.target.value)} /></label>

                <label>Image: <input type="file" name="image" required onChange={event => setImage(event.target.value)} /></label>


                <button className="button" type="submit">Submit</button>

                </form>

                </div>

             </div>
    );
}

export default PublishListing;


    