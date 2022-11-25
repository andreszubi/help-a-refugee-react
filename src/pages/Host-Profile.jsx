import {useContext, useEffect, useState} from "react"
import {SessionContextHost} from "../contexts/SessionContextHost"

function HostProfile() {
    const {token, currentPayload} = useContext(SessionContextHost);
    const [visibleForm, setVisibleForm] = useState(false)
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [typeOfRoom, setTypeOfRoom] = useState("");
    const [ placesAvailable, setPlacesAvailable] = useState("");
    const [ image, setImage] = useState("")
    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const loadingTime = () => {
        if (currentPayload) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }

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


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5005/host/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({country, city, typeOfRoom, placesAvailable, image})
        });
        fetchListings()
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
        loadingTime()  
    },[currentPayload])
    useEffect(() => {
        if (!isLoading) {
            fetchListings()
        }
    }, [isLoading])


    

    return ( 
        <div className="background-img">
          <h1>  {isLoading ? "Loading..." : `Welcome to your profile, ${currentPayload.user.firstName}` }</h1>  
         
        {visibleForm && 
        <div className="PublishListing">

            <div>
                <h1>Publish Listing</h1>
                <form onSubmit={event => handleSubmit(event)}>
        
                    <label>Country:: <input type="text" name="country" required onChange={event => setCountry(event.target.value)} /></label> 

                    <label>City: <input type="text" name="city" required onChange={event => setCity(event.target.value)} /></label>   

                    <label>Type of Room: <input type="text" name="typeOfRoom" required onChange={event => setTypeOfRoom(event.target.value)} /></label>

                    <label>Places Available: <input type="number" name="placesAvailable" required onChange={event => setPlacesAvailable(event.target.value)} /></label>

                    <label>Image: <input type="file" name="image" onChange={event => setImage(event.target.value)} /></label>


                    <button className="button" type="submit">Submit</button>

                </form>

            </div>

        </div>}
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