//Create a component to edit and to also delete a listing
//

import { useContext, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function EditListing() {
    const { token, setToken } = useContext(SessionContextUser);
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [typeOfRoom, setTypeOfRoom] = useState("");
    const [ placesAvailable, setPlacesAvailable] = useState("");
    const [ image, setImage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5005/user/listings/:id", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ country, city, typeOfRoom, placesAvailable, image }),
        });
        const parsed = await response.json();

        if (parsed.status === 200) {
            setToken(parsed.token);
            navigate("/user/listings");
        }
    };

 const handleDelete = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5005/user/listings/:id", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const parsed = await response.json();

        if (parsed.status === 200) {
            setToken(parsed.token);
            navigate("/user/listings");
        }
    };

    return (
        <div className="EditListing">
            <NavBar />
            <div className="background-img">
                <h1>Edit Listing</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Country{" "}
                        <input
                            type="text"
                            name="country"
                            required
                            onChange={(event) => setCountry(event.target.value)}
                        />
                    </label>
                    <label>
                        City{" "}
                        <input
                            type="text"
                            name="city"
                            required
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </label>
                    <label>
                        Type of Room{" "}
                        <input
                            type="text"
                            name="typeOfRoom"
                            required
                            onChange={(event) => setTypeOfRoom(event.target.value)}
                        />
                    </label>
                    <label>
                        Places Available{" "}
                        <input
                            type="number"
                            name="placesAvailable"
                            required
                            onChange={(event) =>
                                setPlacesAvailable(event.target.value)
                            }
                        />
                    </label>
                    <label>
                        Image{" "}
                        <input
                            type="file"
                            name="image"
                            required
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </label>
                    <button type="submit">Edit Listing</button>
                </form>
                <form onSubmit={handleDelete}>
                    <button type="submit">Delete Listing</button>
                </form>
            </div>
        </div>
    );
}





export default EditListing;

