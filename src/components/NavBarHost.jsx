import { Link, useNavigate } from "react-router-dom";

function NavBarHost() {
    const navigate=useNavigate()
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
  return (
    <div className="NavBar">
      <header>
        <nav>
          <Link to="/listings-search">
            <button className="button" type="submit">
              Search for a host
            </button>
          </Link>
            <button className="button" type="submit" onClick={logout}>
              Logout
            </button>
        </nav>
      </header>
    </div>
  );
}

export default NavBarHost;
