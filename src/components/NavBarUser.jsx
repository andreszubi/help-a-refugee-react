import { Link } from "react-router-dom";

function NavBarUser() {
  return (
    <div className="NavBar">
      <header>
        <nav>
          <Link to="/listings-search">
            <button className="button" type="submit">
              Search for a host
            </button>
          </Link>
          <Link to="/logout">
            <button className="button" type="submit">
              Logout
            </button>
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default NavBarUser;
