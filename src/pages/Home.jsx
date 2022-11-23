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
            aliquam nisl odio eget arcu. Ut feugiat eget diam nec faucibus. Sed
            convallis, metus eu lobortis lacinia, orci arcu tempus justo,
            vulputate malesuada metus dui ac ex. Quisque mattis, sapien sit amet
            lacinia finibus, leo diam fermentum augue, efficitur consectetur
            eros tellus in felis. Fusce enim lorem, tincidunt non nisl vel,
            tincidunt molestie justo. Curabitur luctus ipsum commodo tellus
            auctor, id fringilla tellus commodo. Vivamus at dolor neque. Donec
            blandit iaculis elit, nec fermentum nisl imperdiet ut. Morbi id
            vulputate lectus, a iaculis arcu. Curabitur eu vulputate velit.
            Praesent hendrerit felis ut ex facilisis laoreet. Etiam imperdiet
            sagittis sapien, eu ultrices neque euismod sodales. Quisque maximus
            aliquam felis quis volutpat. Sed sit amet magna sed lectus sagittis
            tincidunt sollicitudin nec risus. Suspendisse tincidunt.
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
        </form>

        <div className="signup-btns">
          <Link to="/host-signup">
            <button className="button" type="button">
              Host Signup
            </button>
          </Link>

          <Link to="/user-signup">
            <button className="button" type="button">
              Refugee Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
