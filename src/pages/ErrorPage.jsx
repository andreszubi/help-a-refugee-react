import Footer from "../components/Footer";
import errorImg from "../images/errorImg.png";
import { Link } from "react-router-dom";
import NavBarMain from "../components/NavBarMain";
function ErrorPage() {
  return (
    <>
      <div className="appContainer">
        <div className="Home">
          <NavBarMain />
          <div className="notPass">
            <Link to="/" className="notPassLink">
              <img src={errorImg} alt="errorImage" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
