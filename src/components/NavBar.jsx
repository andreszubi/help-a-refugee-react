import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <nav>
        <div>
          <Link to="/">
            <h1>Host a refugee</h1>
          </Link>
        </div>
        <div className="buttons">
          <Link to="/host-signup">
            <button className="button" type="button">
              Host Signup
            </button>
          </Link>
          <Link to="/host-login">
            <button className="button" type="button">
              Host Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
