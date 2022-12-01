import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

function ListingBox({ listing }) {
  const { token, currentUser } = useContext(SessionContextUser);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
      setUserId(currentUser.user._id);
    } else {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  const handleRent = async (event, id) => {
    event.preventDefault();
    console.log(userId);
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/user/listings/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const parsed = await response.json();
    console.log(parsed)
    if (response.status===200) {
      navigate("/booking-confirmation")
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader color="grape" />
        </div>
      ) : (
        <div className="searchResults">
          <div className="card">
            <div className="firstinfo">
              <img className="userImg" src={listing.image} />
            </div>
            <div className="listingTxt">
              <h2 className="names">
                <b>
                  Location: {listing.city}, {listing.country}
                </b>
              </h2>
              <h3 className="extraInf">Type of room: {listing.typeOfRoom}</h3>
              <h3 className="extraInf">
                Places available: {listing.placesAvailable}
              </h3>
              <h3>
                Host: {listing.owner.firstName} {listing.owner.lastName}
              </h3>
            </div>
            {listing.usedBy ? (
              <h3 className="listingInUse">Already in use!</h3>
            ) : (
              <button
                className="button"
                type="button"
                onClick={(event) => handleRent(event, listing._id)}
              >
                Reserve
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListingBox;