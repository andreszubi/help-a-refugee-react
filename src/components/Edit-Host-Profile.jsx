// Create a new components for the host to be able to edit their profile details
//

import { useContext, useState } from "react";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function EditHostProfile() {
    const { token, setToken } = useContext(SessionContextHost);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    


    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/host/edit/:id`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, hashedPassword, firstName, lastName, city, country, image, aboutMe }),
        });
        const parsed = await response.json();

        if (parsed.status === 200) {
        setToken(parsed.token);
        navigate("/host/profile");
        }
    };

    return (
        <div className="EditHostProfile">
            <NavBar />
            <div className="background-img">
                <h1>Edit Host Profile</h1>
                <form onSubmit={handleSubmit}>

                    <label>
                        Email{" "}
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>

                    <label>
                        Password{" "}
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={hashedPassword}
                        required
                        onChange={(event) => setHashedPassword(event.target.value)}
                        />
                    </label>
                
                    <label>
                        First Name{" "}
                        <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        required
                        onChange={(event) => setFirstName(event.target.value)}
                        />
                    </label>

                    <label>
                        Last Name{" "}
                        <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        required
                        onChange={(event) => setLastName(event.target.value)}
                        />
                    </label>

                    <label>
                        City{" "}
                        <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        required
                        onChange={(event) => setCity(event.target.value)}
                        />
                    </label>

                    <label>
                        Country{" "}
                        <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        required
                        onChange={(event) => setCountry(event.target.value)}
                        />
                    </label>

                    <label>
                        Image{" "}
                        <input
                        type="file"
                        id="image"
                        name="image"
                        value={image}
                        required
                        onChange={(event) => setImage(event.target.value)}
                        />
                    </label>

                    <label>
                        About Me{" "}
                        <input
                        type="text"
                        id="aboutMe"
                        name="aboutMe"
                        value={aboutMe}
                        required
                        onChange={(event) => setAboutMe(event.target.value)}
                        />
                    </label>


                   <button className="button" type="submit">Edit Profile</button> 
                </form>
            </div>
        </div>
    );
}

export default EditHostProfile;
