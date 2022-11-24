import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

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
            inceptos himenaeos. Praesent nec nisl in libero mollis vehicula.
            Pellentesque pharetra metus posuere nunc euismod sodales. Donec
            eleifend nibh urna, ac lacinia quam suscipit quis. In hac habitasse
            platea dictumst. Aliquam auctor augue lobortis enim accumsan
            sodales. Nam sollicitudin, augue in posuere luctus, urna lorem
            placerat ex, porta placerat tellus sem ut justo. In egestas, magna
            sed maximus volutpat, ipsum eros mattis sapien, id varius erat
            libero vel metus. Mauris efficitur sem sed porttitor eleifend.
            Curabitur id nulla ac turpis pellentesque consectetur placerat sit
            amet sapien. Morbi porttitor, urna sit amet rhoncus auctor, ipsum
            diam molestie nulla, vitae commodo nunc leo non sem. Pellentesque
            euismod, ligula in finibus molestie, felis ipsum lacinia lacus, et
            aliquam nisl odio eget arcu.
          </p>
        </div>
        <form>
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <button className="button" type="button">
            Login
          </button>
          <div
            className="signup-btns"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p style={{ width: "20vw" }}>Not a member yet? </p>
            <Link to="/user-signup">
              <a style={{ color: "white" }}>
                <button className="button">Sign up!</button>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
