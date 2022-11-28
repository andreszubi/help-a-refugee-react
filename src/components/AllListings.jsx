import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import ListingBox from "./ListingBox";

const ListingsSearchUser = ({ query, setQuery }) => {
  const { token, currentUser, setCurrentUser } = useContext(SessionContextUser);
  const [search, setSearch] = useState("");
  // const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");
  // const [typeOfRoom, setTypeOfRoom] = useState("");
  // const [ placesAvailable, setPlacesAvailable] = useState("");
  // const [ image, setImage] = useState("")
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const response = await fetch("http://localhost:5005/user/listings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    console.log(parsed);
    setListings(parsed);
  };

  return (
    <>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {listings &&
        listings
          .filter((listing) => {
            return listing.city.toLowerCase().includes(search.toLowerCase());
          })
          .map((e) => {
            return <ListingBox listing={e} />;
          })}
    </>
  );
};
export default ListingsSearchUser;
