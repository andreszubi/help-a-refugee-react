import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import errorImg from "../images/errorImg.png";

function ErrorPage() {
  return (
    <div className="container">
      <div className="Home">
        <NavBar />
        <div>
          <Link to="/">
            <img src={errorImg} alt="errorImage" />
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ErrorPage;
