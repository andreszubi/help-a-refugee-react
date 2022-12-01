import { Link } from "react-router-dom";
import logo from "../images/Logo2.png";

function NavBarMain() {
  return (
    <nav className="NavBar" style={{justifyContent:"center"}}>
      <div>
        <Link to="/">
          <img src={logo} alt="brandLogo" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBarMain;
