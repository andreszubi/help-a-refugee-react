import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function HostLogin() {
    return (
        <div className="HostLogin">
        <NavBar />

        <div className="background-img">
        <h1>Host Login</h1>
        <form>
            <label >Email <input type="email" id="email" name="email" /></label>
            
            <label>Password <input type="password" id="password" name="password" /></label>
            
            <Link to="/host-profile">
            <button className="button" type="button">
                Login
            </button>
            </Link>
        </form>

        </div>
        </div>
    );
    }

export default HostLogin;