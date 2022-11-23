import { Link } from "react-router-dom";
import NavBar from "./NavBar";





function Home() {
  

  return (
    <div className="Home">

      <NavBar />
     

      <h1>Home</h1>

      <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nibh lorem, egestas aliquet egestas eu, porta ac magna. Donec luctus ligula nec dolor lobortis, eget pharetra ipsum efficitur. Aliquam tincidunt magna quis nunc consequat bibendum. Cras semper orci metus, in tempor tortor aliquet id. Nullam ullamcorper nisl non tempus viverra. Fusce vitae aliquam sem. Vivamus a metus in sem porta aliquam. Nam blandit lectus lorem, a maximus nunc pharetra ac. Nullam quis magna non ligula scelerisque efficitur. Integer at enim id diam rutrum suscipit vel non elit. Praesent elementum auctor leo eget egestas.</h2>

      <form>
        <label>Email<input type="email" name="email" /></label>
        <label>Password<input type="password" name="password" /></label>
        <button type="button">Login</button>
      </form>





      

    </div>
  );
}

export default Home;