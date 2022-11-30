import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo2.png";

function NavBarHost() {
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
        <button className="button" type="submit" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBarHost;
