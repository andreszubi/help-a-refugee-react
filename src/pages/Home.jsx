import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";

function Home() {
  return (
    <div className="Home">
      <NavBar />

      <div className="background-img">
        <div class="transbox">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
            libero nec risus tincidunt luctus. Nulla tempus eu massa sed
            efficitur. Proin interdum quis velit blandit vulputate. Duis tempus
            vehicula augue, eget tincidunt lectus. Ut vel sapien ut diam
            volutpat volutpat. In aliquet lectus eu massa pulvinar, quis
            hendrerit elit congue. Nulla augue nunc, consequat a mattis id,
            egestas in ligula. Pellentesque sodales dignissim dictum. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Home;
