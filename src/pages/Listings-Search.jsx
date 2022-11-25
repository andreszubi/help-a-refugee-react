// Generate a list of listings for the users to choose from based on search criteria
//

import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../components/NavBarUser";
import ListingsSearchUser from "../components/ListingsSearchUser";

function ListingsSearch() {
  const optionsCity = [
    { value: "berlin", label: "Berlin" },
    { value: "frankfurt", label: "Frankfurt" },
    { value: "lisbon", label: "Lisbon" },
    { value: "lubin", label: "Lubin" },
    { value: "paris", label: "Paris" },
    { value: "prague", label: "Prague" },
    { value: "warsaw", label: "Warsaw" },
  ];
  // const { token, setToken } = useContext(SessionContextUser);
  // const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await fetch("http://localhost:5005/user/listings", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ country, city, typeOfRoom, placesAvailable }),
  //   });
  //   const parsed = await response.json();

  //   if (parsed.status === 200) {
  //     setToken(parsed.token);
  //     navigate("/user/listings");
  //   }
  // };

  return (
    <div className="ListingsSearch">
      <NavBarUser />
      <div className="App">
        <ListingsSearchUser placeHolder="Select..." options={optionsCity} />
      </div>
      {/* <div className="background-img">
        <h1>Search Listings</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Country{" "}
            <input
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </label>
          <label>
            City{" "}
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
          <label>
            Type of Room{" "}
            <input
              type="text"
              value={typeOfRoom}
              onChange={(event) => setTypeOfRoom(event.target.value)}
            />
          </label>
          <label>
            Places Available{" "}
            <input
              type="number"
              value={placesAvailable}
              onChange={(event) => setPlacesAvailable(event.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default ListingsSearch;
