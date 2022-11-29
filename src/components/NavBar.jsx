import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar">
      <div>
        <Link to="/">
          <img src="../public/images/Logo2.png" alt="brandLogo" />
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
  );
}

export default NavBar;
