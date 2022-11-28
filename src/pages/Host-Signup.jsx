
import NavBar from "../components/NavBar";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

function HostSignup() {

const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [imageUrl, setImageUrl] = useState("")


  /*const handleFileUpload = async value => {
    setImageUrl(value)
    const response = await fetch ("http://localhost:5005/host/upload" , {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({imageUrl})
    });
    const parsed = await response.json();
    console.log(parsed)
  }*/

  const handleSubmit = async event => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("country", country);
    formData.append("city", city)
    const response = await axios({
      method: "post", url: "http://localhost:5005/host/signup",
      data: formData, headers: {"Content-Type": "multipart/form-data"}
    })
    console.log(response.data)
    navigate("/host-login")

  }



  return (
    <div className="Host-Signup">
        <NavBar />

        <div className="background-img">

      <h1>Host-Signup</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Email: <input type="email" required name="email" value={email} onChange={event => setEmail(event.target.value)}/></label>

        <label>Password: <input type="password" required name="password" value={password} onChange={event => setPassword(event.target.value)} /></label>

        <label>First Name: <input type="text" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} /></label>

        <label>Last Name: <input type="text" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} /></label>

        <label>Country: <input type="text" name="country" value={country} onChange={event => setCountry(event.target.value)} /> </label>

        <label>City: <input type="text" name="city" value={city} onChange={event => setCity(event.target.value)} /></label>

        <label>Profile Picture: <input type="file" name="imageUrl" accept="image/png, image/jpg"/></label>


        <button className="button" type="submit">Submit</button>

      </form>

      </div>

    </div>
  );
}

export default HostSignup;
