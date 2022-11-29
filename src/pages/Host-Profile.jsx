import { Card, Modal, Skeleton, Text, Image } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarHost from "../components/NavBarHost";
import { SessionContextHost } from "../contexts/SessionContextHost";

function HostProfile() {
    const {token, currentPayload} = useContext(SessionContextHost);
    const [visibleForm, setVisibleForm] = useState(false)
    const [newCountry, setNewCountry] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newTypeOfRoom, setNewTypeOfRoom] = useState("");
    const [ newPlacesAvailable, setNewPlacesAvailable] = useState("");
    const [newImage, setNewImage] = useState("")
    const [editId, setEditId] = useState("");
    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    

  const loadingTime = () => {
    if (currentPayload) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const fetchListings = async () => {
    const response = await fetch("http://localhost:5005/host/listings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    setListings(parsed);
  };

  useEffect(() => {
    loadingTime();
  }, [currentPayload]);
  useEffect(() => {
    if (!isLoading) {
      fetchListings();
    }
  }, [isLoading]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const image = event.target.imageUrl.files[0];
        const fData = new FormData();
        fData.append("imageUrl", image)
        fData.append("country", newCountry);
        fData.append("city", newCity);
        fData.append("typeOfRoom", newTypeOfRoom);
        fData.append("placesAvailable", newPlacesAvailable);
        const response = await fetch("http://localhost:5005/host/listings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: fData
        });
        fetchListings();
        setNewCountry("");
        setNewCity("");
        setNewPlacesAvailable("");
        setNewTypeOfRoom("");
        setNewImage("")
    }

    const handleModal = (id) => {
        const listing = listings.filter(e=> 
            e._id === id
        )[0]
        setNewCountry(listing.country);
        setNewCity(listing.city);
        setNewTypeOfRoom(listing.typeOfRoom);
        setNewPlacesAvailable(listing.placesAvailable);
        setNewImage(listing.image);
        setEditId(id)
        setIsEditing(true)
    }



    const deleteListing = async (id, event) => {
        event.preventDefault()
        console.log(id)
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

    const handleEditDetails = async (event) => {
        event.preventDefault();
        const image = event.target.imageUrl.files[0];
        const fData = new FormData();
        fData.append("imageUrl", image);
        fData.append("country", newCountry);
        fData.append("city", newCity);
        fData.append("typeOfRoom", newTypeOfRoom);
        fData.append("placesAvailable", newPlacesAvailable);
        const response = await fetch (`http://localhost:5005/host/listings/${editId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fData
        });
        const updatedListing = await response.json();
        setIsEditing(false);
        fetchListings();
        setNewCountry("");
        setNewCity("");
        setNewPlacesAvailable("");
        setNewTypeOfRoom("");
        setNewImage("");
        setEditId("")
        
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


    

    return ( <>
    <NavBarHost />
        <div className="background-img">
         {isLoading ? 
         <h1>   "Loading..." </h1>    
         : 
         (<div style={{display:"flex", gap: "50px"}}>
         <h1>Welcome to your profile, {currentPayload.user.firstName}</h1>
         <img src={currentPayload.user.image} style={{width:"20vw", height:"30vh", margin:"0", padding:"0"}}/>
         </div>)}
        {visibleForm && 
        <div className="PublishListing">
          <div>
            <h1>Publish Listing</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
              <label>
                Country:{" "}
                <input
                  type="text"
                  name="newCountry"
                  required
                  onChange={(event) => setNewCountry(event.target.value)}
                />
              </label>

              <label>
                City:{" "}
                <input
                  type="text"
                  name="newCity"
                  required
                  onChange={(event) => setNewCity(event.target.value)}
                />
              </label>

              <label>
                Type of Room:{" "}
                <input
                  type="text"
                  name="newTypeOfRoom"
                  required
                  onChange={(event) => setNewTypeOfRoom(event.target.value)}
                />
              </label>

              <label>
                Places Available:{" "}
                <input
                  type="number"
                  name="newPlacesAvailable"
                  required
                  onChange={(event) =>
                    setNewPlacesAvailable(event.target.value)
                  }
                />
              </label>

              <label>
                Image:{" "}
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/png, image/jpg"
                />
              </label>

              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
     }
      <button type="button" onClick={setVisibilityForm}>
        {visibleForm ? "Hide form" : "Add a new listing"}
      </button>
      <div className="listings">
        {listings.map(
          ({ _id, image, country, city, typeOfRoom, placesAvailable }) => (
            <div key={_id} className="listing">
                <button type ="button" onClick={event => deleteListing(_id, event)}>Remove listing</button>
                <Skeleton visible={isLoading}>
                    <Card shadow="sm" p="lg" radius="md" withBorder style={{display:"flex", flexDirection:"column"}}>
                        <Text fz="lg">Country: {country}</Text>
                        <Text fz="lg">City: {city}</Text>
                        <Text fz="lg">Type of room: {typeOfRoom}</Text>
                        <Text fz="lg">Rooms available: {placesAvailable}</Text>
                        <Image radius="md"  width={200} height={80} src={image} alt="House" style={{alignSelf:"center"}}/> 
                        <button className="button" type="submit" onClick={() => handleModal(_id)} style={{alignSelf:"center"}}>Edit details</button>
                    </Card>
                </Skeleton>
                <Modal opened={isEditing} onClose={()=>setIsEditing(false)} title="Edit listing">
                    <form onSubmit={handleEditDetails}>
                        <label>
                            Country: <input value={newCountry} onChange={(event) => setNewCountry(event.target.value)}/>
                        </label>
                        <label>
                            City: <input value={newCity} onChange={(event) => setNewCity(event.target.value)}/>
                        </label>
                        <label>
                            Type of room: <input value={newTypeOfRoom} onChange={(event) => setNewTypeOfRoom(event.target.value)}/>
                        </label>
                        <label>
                            Rooms available: <input value={newPlacesAvailable} onChange={(event) => setNewPlacesAvailable(event.target.value)}/>
                        </label>
                        <label>
                            Image: <input type="file" name="imageUrl" accept="image/png, image/jpg" onChange={(event) => setNewImage(event.target.image.files[0])}/>
                        </label>
                        
                        <button className="button" type="submit">
                            Update
                        </button>
                    </form>
                </Modal>
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
}

export default HostProfile;
