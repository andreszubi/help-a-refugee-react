import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import ListingBox from "./ListingBox";

const ListingsSearchUser = ({ query, setQuery }) => {
  const { token, currentUser, setCurrentUser } = useContext(SessionContextUser);
  const [search, setSearch] = useState("");
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
    setListings(parsed);
  };

  return (
    <>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div>
        <h3>Housing list</h3>
      </div>
      <div className="allListings">
        {listings &&
          listings
            .filter((listing) => {
              return listing.city.toLowerCase().includes(search.toLowerCase());
            })
            .map((e) => {
              return <ListingBox listing={e} key={e._id}/>;
            })}
      </div>
    </>
  );
};
export default ListingsSearchUser;
