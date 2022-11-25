import {Link} from "react-router-dom";


function NavBar() {
  return (
    <div className="NavBar">
        
            <header>
                <nav>
                    <Link to ="/"><h1>Host a refugee</h1></Link>
                    <Link to= "/host-signup">
                      <button className="button" type="button">
                        Host Signup
                      </button>
                    </Link>
                    <Link to= "/host-login">
                      <button className="button" type="button">
                        Host Login
                      </button>
                    </Link>
                </nav>
             
            </header>
      {/* <Link to="/">Home</Link>
      <Link to="/host-signup">Host Signup</Link>
      <Link to="/refugee-signup">Refugee Signup</Link>
      <Link to="/refugee-profile">Refugee Profile</Link>
      <Link to="/host-profile">Host Profile</Link>
      <Link to="/listings-search">Listings Search</Link>
      <Link to="/listing-details">Listing Details</Link>
      <Link to="/messages">Messages</Link> */}
     
    </div>
  );
}

export default NavBar;