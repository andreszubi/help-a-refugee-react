import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";

function ListingBox({ listing}) {
  const {token, currentUser} = useContext(SessionContextUser);
  const [isLoading, setIsLoading] = useState(true)
  let userId;
  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
      return userId = currentUser.user._id
    } else {
      setIsLoading(true);
    }
  };
  useEffect(()=> {
    loadingTime()
  },[currentUser])

  const handleRent = async (event, id)=> {
    event.preventDefault()
    const response = await fetch(`http://localhost:5005/user/listings/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: userId
    });
    const parsed = await response.json();
  }

  return (
    <>{isLoading ?
      <h1>Loading...</h1>
      :
    (<div className="searchResults">
      <div className="card">
        <div className="firstinfo">
          <img className="userImg" src={listing.image} />
        </div>
        <div className="profileinfo">
          <h2 className="names">
            Location: {listing.city}, {listing.country}
          </h2>
          <h3 className="extraInf">Type of room: {listing.typeOfRoom}</h3>
          <h3 className="extraInf">
            Places available: {listing.placesAvailable}
          </h3>
          <h3>Owner: {listing.owner.firstName} {listing.owner.lastName}</h3>
        </div>
        <button type="button" onClick={(event) =>handleRent(event, listing._id)}>Reserve</button>
      </div>
    </div>)
    }</>
    
  );
}

export default ListingBox;
