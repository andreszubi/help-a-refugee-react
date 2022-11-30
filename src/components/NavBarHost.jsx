import { Link, useNavigate } from "react-router-dom";

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
          <img src="../public/images/Logo2.png" alt="brandLogo" />
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
