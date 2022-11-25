//Create a page that displays that the booking has been confirmed and the user can see the details of the booking.
//
import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function BookingConfirmation() {
    const { token} = useContext(SessionContextUser);
   

    return (
        <div className="BookingConfirmation">
            <NavBar />
            <div className="background-img">
                <h1>Booking Confirmation</h1>
                <h2> Thank you for trusting us, your booking has been comfirmed!</h2>
                <h3>Booking Details</h3>
                <img 
                  src="{image}"
                    alt="image of listing"
                />
                <p>Country: {token.housing.country}</p>
                <p>City: {token.housing.city}</p>
                <p>Type of Room: {token.housing.typeOfRoom}</p>
                <p>Places Available: {token.housing.placesAvailable}</p>
                <p>Host: {owner}</p>

                <Link to="/user-profile"><button className="button">Go to your profile</button></Link>

            </div>
        </div>


    );
}

export default BookingConfirmation;