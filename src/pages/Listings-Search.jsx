import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../components/NavBarUser";
import AllListings from "../components/AllListings";

function ListingsSearch() {
  const [listings, setListings] = useState([]);

  const { token, setToken } = useContext(SessionContextUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5005/user/listings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ country, city, typeOfRoom, placesAvailable }),
    });
    const parsed = await response.json();

    if (parsed.status === 200) {
      setL;
      setToken(parsed.token);
      navigate("/user/listings");
    }
  };

  return (
    <div className="ListingsSearch">
      <NavBarUser />
      {listings.filter((listing) => listing.city.toLowerCase().includes())}
      <AllListings />
    </div>
  );
}

export default ListingsSearch;
