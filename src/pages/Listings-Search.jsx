import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../components/NavBarUser";
// import ListingsSearchUser from "../components/ListingsSearchUser";
import AllListings from "../components/AllListings";

function ListingsSearch() {
  const [listings, setListings] = useState([]);
  const optionsCity = [
    { value: "berlin", label: "Berlin" },
    { value: "frankfurt", label: "Frankfurt" },
    { value: "lisbon", label: "Lisbon" },
    { value: "lubin", label: "Lubin" },
    { value: "paris", label: "Paris" },
    { value: "prague", label: "Prague" },
    { value: "warsaw", label: "Warsaw" },
  ];

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
