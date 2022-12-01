import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo2.png";

function NavBarUser({ place }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="NavBar">
      <div>
        <Link to="/">
          <img src={logo} alt="brandLogo" />
        </Link>
      </div>
      <div className="buttons">
        {place === "profile" ? (
          <Link to="/listings-search">
            <button className="button" type="submit">
              Search for a host
            </button>
          </Link>
        ) : (
          <Link to="/user-profile">
            <button className="button" type="submit">
              Profile page
            </button>
          </Link>
        )}
        <button className="button" type="submit" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBarUser;
