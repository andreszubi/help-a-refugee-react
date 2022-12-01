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
            <h1>Host a refugee in your home</h1>
            <p className="textLanding2">
              The Host a Refugee Network helps men, women and children who are
              fleeing for their lives to rebuild their lives. We have have been
              helping refugees and minority ethnic communities since 2016. We
              pioneered Room for Refugees, the oldest and longest established
              refugee hosting programme in the U.K. with 17,000 volunteer hosts.
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
