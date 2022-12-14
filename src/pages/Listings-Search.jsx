import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import AllListings from "../components/AllListings";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";

function ListingsSearch() {
  const [isLoading, setIsLoading] = useState(true);

  const { token, setToken, currentUser } = useContext(SessionContextUser);
  const place = "search";

  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  return (
    <div className="ListingsSearch">
      {isLoading ? (
        <div>
          <Loader color="grape" />
        </div>
      ) : (
        <>
          <NavBarUser place={place} />
          <div className="appContainer">
            <h1 className="largeTextSignUp2">Search for a host</h1>
            <AllListings />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default ListingsSearch;
