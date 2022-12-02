import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="appContainer">
      <div className="Home">
        <NavBar />

        <div className="transbox">
          <div className="textBox font-link">
            <h1 className="hostTitle">Host a refugee in your home</h1>
            <p className="textLanding2">
              The Host a Refugee Network helps women, children and men to find a to find a safe place to stay.<br></br>
               Whether they are running from war, persecution or natural disaster, we help them to find a safe place to stay.<br></br>
              Our mission is to help people find a stable home and a safe place to stay in order to rebuild their lives <br></br>
               which would enable them to persue a better future.
              By hosting a refugee in your home, you can help them <br></br>
               to rebuild their lives and help them to persue a better future.
            </p>
          </div>
          <div>
            {" "}
            <LoginForm />{" "}
          </div>
        </div>
        <div className="background-img"></div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
