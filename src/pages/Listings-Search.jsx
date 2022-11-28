import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import NavBarUser from "../components/NavBarUser";
import ListingsSearchUser from "../components/ListingsSearchUser";
// import AllListings from "../components/AllListings";

function ListingsSearch() {
  const [listings, setListings] = useState;
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
      <div className="searchOptions">
        {" "}
        <h3>City: </h3>
        <ListingsSearchUser
          isSearchable
          placeHolder="Select..."
          options={optionsCity}
        />
      </div>
      <button className="button" type="submit">
        Submit
      </button>
      <div>
        <h3>Housing list</h3>
      </div>
      {listings.filter((listing) => listing.city.toLowerCase().includes())}
      <AllListings />
      <button className="button" type="submit">
        Book now
      </button>
    </div>
  );
}

export default ListingsSearch;

// import { useState } from "react";
// import ListingBox from "../components/Listing";
// import Search from "../components/Search";

// function ListingsSearch() {
//   const [listings, setListings] = useState("");
//   const [query, setQuery] = useState("");

//   const fetchListings = async () => {
//     const response = await fetch("http://localhost:5005/user/listings", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const parsed = await response.json();
//     setListings(parsed);
//   };

//   return (
//     <div className="App">
//       <div>
//         <Search query={query} setQuery={setQuery} />
//         <div>
//           <h1>Food List</h1>
//         </div>
//         {listings
//           .filter((listing) =>
//             listing.city.toLowerCase().includes(query.toLowerCase())
//           )
//           .map((listing) => {
//             return (
//               <div key={_id}>
//                 <ListingBox listing={listing} listings={listings} />
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// export default ListingsSearch;
