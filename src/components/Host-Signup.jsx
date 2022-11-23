
import NavBar from "./NavBar";
import { useState } from "react"
import axios from "axios";

function HostSignup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  //const [picture, setPicture] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await fetch("http://localhost:5005/host/signup", {
      method: "POST", 
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, firstName, lastName, country, city})
    });
    const parsed = await response.json()
    console.log(parsed)
  }



  return (
    <div className="Host-Signup">
        <NavBar />

      <h1>Host-Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type="email" required name="email" value={email} onChange={event => setEmail(event.target.value)}/></label>

        <label>Password: <input type="password" required name="password" value={password} onChange={event => setPassword(event.target.value)} /></label>

        <label>First Name: <input type="text" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} /></label>

        <label>Last Name: <input type="text" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} /></label>

        <label>Country: <input type="text" name="country" value={country} onChange={event => setCountry(event.target.value)} /> </label>

        <label>City: <input type="text" name="city" value={city} onChange={event => setCity(event.target.value)} /></label>

        {/*<label>Profile Picture: <input type="file" name="image" value={picture} onChange={event => setPicture(event.target.value)} /></label>*/}


        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default HostSignup;
