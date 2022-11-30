import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import AllListings from "../components/AllListings";

function ListingsSearch() {
  const [isLoading, setIsLoading] = useState(true);

  const { token, setToken, currentUser } = useContext(SessionContextUser);
  const place = "search"
  
  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(()=> {
    loadingTime()
  },[currentUser])



  return (
    <div className="ListingsSearch">
      {isLoading ? (<h1>Loading...</h1>)
      : (<>
      <NavBarUser place ={place}/>
      <AllListings />
      </>)
      }
      
    </div>
  );
}

export default ListingsSearch;
