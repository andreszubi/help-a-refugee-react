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
  const optionsPersons = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
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
        {" "}
        <h3>City: </h3>
        <ListingsSearchUser
          isSearchable
          placeHolder="Select..."
          options={optionsCity}
        />
      </div>
      <div className="App">
        {" "}
        <h3>Quantity of people: </h3>
        <ListingsSearchUser
          isSearchable
          placeHolder="Select..."
          options={optionsPersons}
        />
      </div>
      <button className="button" type="submit">
        Submit
      </button>
    </div>
  )
}

export default ListingsSearch;
