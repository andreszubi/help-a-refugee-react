import { Card, Modal, Skeleton, Text, Image } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarHost from "../components/NavBarHost";
import { SessionContextHost } from "../contexts/SessionContextHost";
import Footer from "../components/Footer";

function HostProfile() {
  const { token, currentPayload, setCurrentPayload, isLoading, setIsLoading } =
    useContext(SessionContextHost);
  const [visibleForm, setVisibleForm] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newTypeOfRoom, setNewTypeOfRoom] = useState("");
  const [newPlacesAvailable, setNewPlacesAvailable] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editId, setEditId] = useState("");
  const [listings, setListings] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserCity, setNewUserCity] = useState("");
  const [newUserCountry, setNewUserCountry] = useState("");
  const [newAboutMe, setNewAboutMe] = useState("");
  const [isEditingUser, setIsEditingUser] = useState(false);

  const loadingTime = () => {
    if (currentPayload) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const fetchListings = async () => {
    const response = await fetch("http://localhost:5005/host/listings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    setListings(parsed);
  };

  useEffect(() => {
    loadingTime();
  }, [currentPayload]);
  useEffect(() => {
    if (!isLoading) {
      fetchListings();
    }
  }, [isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const fData = new FormData();
    fData.append("imageUrl", image);
    fData.append("country", newCountry);
    fData.append("city", newCity);
    fData.append("typeOfRoom", newTypeOfRoom);
    fData.append("placesAvailable", newPlacesAvailable);
    const response = await fetch("http://localhost:5005/host/listings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fData,
    });
    fetchListings();
    setNewCountry("");
    setNewCity("");
    setNewPlacesAvailable("");
    setNewTypeOfRoom("");
    setNewImage("");
  };

  const handleModalListing = (id) => {
    const listing = listings.filter((e) => e._id === id)[0];
    setNewCountry(listing.country);
    setNewCity(listing.city);
    setNewTypeOfRoom(listing.typeOfRoom);
    setNewPlacesAvailable(listing.placesAvailable);
    setNewImage(listing.image);
    setEditId(id);
    setIsEditing(true);
  };

  const handleModalUser = () => {
    setNewEmail(currentPayload.user.email);
    setNewFirstName(currentPayload.user.firstName);
    setNewLastName(currentPayload.user.lastName);
    setNewUserCountry(currentPayload.user.country);
    setNewUserCity(currentPayload.user.city);
    setNewAboutMe(currentPayload.user.aboutMe);
    setIsEditingUser(true);
  };

  const deleteListing = async (id, event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5005/host/listings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    fetchListings();
  };

  const handleEditDetails = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const fData = new FormData();
    fData.append("imageUrl", image);
    fData.append("country", newCountry);
    fData.append("city", newCity);
    fData.append("typeOfRoom", newTypeOfRoom);
    fData.append("placesAvailable", newPlacesAvailable);
    const response = await fetch(
      `http://localhost:5005/host/listings/${editId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fData,
      }
    );
    const updatedListing = await response.json();
    setIsEditing(false);
    fetchListings();
    setNewCountry("");
    setNewCity("");
    setNewPlacesAvailable("");
    setNewTypeOfRoom("");
    setNewImage("");
    setEditId("");
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const fData = new FormData();
    fData.append("imageUrl", image);
    fData.append("email", newEmail);
    fData.append("firstName", newFirstName);
    fData.append("lastName", newLastName);
    fData.append("country", newUserCountry);
    fData.append("city", newUserCity);
    fData.append("aboutMe", newAboutMe);
    const response = await fetch(
      `http://localhost:5005/host/host/edit/${currentPayload.user._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fData,
      }
    );
    const updatedHost = await response.json();
    setCurrentPayload(updatedHost);
    setIsEditingUser(false);
  };

  const setVisibilityForm = () => {
    setVisibleForm(!visibleForm);
  };

  useEffect(() => {
    loadingTime();
  }, [currentPayload]);
  useEffect(() => {
    if (!isLoading) {
      fetchListings();
    }
  }, [isLoading]);
  useEffect(() => {
    loadingTime();
  }, []);

  return (
    <div className="container">
      <NavBarHost />
      <div>
        {isLoading ? (
          <h1> Loading... </h1>
        ) : (
          <div>
            <div className="font-link largeTextSignUp">
              <h1>Welcome to your profile, {currentPayload.user.firstName}</h1>
            </div>
            <div className="hostProfAll">
              <Skeleton visible={isLoading}>
                <div className="profileFull">
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <div className="profileInfo">
                      <img
                        className="profileImage"
                        src={currentPayload.user.image}
                        alt="user photo"
                      />
                      <div className="allProfileText">
                        <Text className="profileText">
                          Full name: {currentPayload.user.firstName}{" "}
                          {currentPayload.user.lastName}
                        </Text>
                        <Text className="profileText">
                          Email: {currentPayload.user.email}
                        </Text>
                        <Text className="profileText">
                          Address: {currentPayload.user.city},{" "}
                          {currentPayload.user.country}
                        </Text>
                        <Text className="profileText">
                          About me: {currentPayload.user.aboutMe}
                        </Text>
                      </div>
                      <button
                        className="button"
                        type="submit"
                        onClick={() => handleModalUser()}
                      >
                        Edit profile
                      </button>
                    </div>
                  </Card>
                </div>
              </Skeleton>
              <Modal
                opened={isEditingUser}
                onClose={() => setIsEditingUser(false)}
                // title="Edit Profile"
                className="editProfileTxt"
              >
                <form className="formEdit" onSubmit={handleEditUser}>
                  <label>
                    Profile Picture:{" "}
                    <input
                      type="file"
                      name="imageUrl"
                      accept="image/png, image/jpg"
                      className="profileText "
                    />
                  </label>
                  <label>
                    First name:
                    <input
                      value={newFirstName}
                      onChange={(event) => setNewFirstName(event.target.value)}
                    />
                  </label>
                  <label>
                    Last name:
                    <input
                      value={newLastName}
                      onChange={(event) => setNewLastName(event.target.value)}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      value={newEmail}
                      onChange={(event) => setNewEmail(event.target.value)}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      value={newUserCountry}
                      onChange={(event) =>
                        setNewUserCountry(event.target.value)
                      }
                    />
                  </label>
                  <label>
                    City:
                    <input
                      value={newUserCity}
                      onChange={(event) => setNewUserCity(event.target.value)}
                    />
                  </label>
                  <label>
                    About me:
                    <input
                      value={newAboutMe}
                      onChange={(event) => setNewAboutMe(event.target.value)}
                    />
                  </label>
                  <button className="button editFormBtb" type="submit">
                    Update
                  </button>
                </form>
              </Modal>

              <div className="listingsList">
                {visibleForm && (
                  <div className="PublishListing">
                    <div>
                      <h1>Publish Listing</h1>
                      <form
                        className="formEdit"
                        onSubmit={(event) => handleSubmit(event)}
                      >
                        <label>
                          Country:{" "}
                          <input
                            type="text"
                            name="newCountry"
                            required
                            onChange={(event) =>
                              setNewCountry(event.target.value)
                            }
                          />
                        </label>

                        <label>
                          City:{" "}
                          <input
                            type="text"
                            name="newCity"
                            required
                            onChange={(event) => setNewCity(event.target.value)}
                          />
                        </label>

                        <label>
                          Type of Room:{" "}
                          <input
                            type="text"
                            name="newTypeOfRoom"
                            required
                            onChange={(event) =>
                              setNewTypeOfRoom(event.target.value)
                            }
                          />
                        </label>

                        <label>
                          Places Available:{" "}
                          <input
                            type="number"
                            name="newPlacesAvailable"
                            required
                            onChange={(event) =>
                              setNewPlacesAvailable(event.target.value)
                            }
                          />
                        </label>

                        <label>
                          Image:{" "}
                          <input
                            type="file"
                            name="imageUrl"
                            accept="image/png, image/jpg"
                          />
                        </label>

                        <button className="button" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                <button
                  className="button"
                  type="button"
                  onClick={setVisibilityForm}
                >
                  {visibleForm ? "Hide form" : "Add a new listing"}
                </button>
                <div className="listings">
                  <div className="eachListing">
                    {listings.map(
                      ({
                        _id,
                        image,
                        country,
                        city,
                        typeOfRoom,
                        placesAvailable,
                      }) => (
                        <div key={_id}>
                          <Skeleton visible={isLoading}>
                            <div>
                              <Card
                                className="listing"
                                shadow="sm"
                                p="lg"
                                radius="md"
                                withBorder
                              >
                                <div className="listingImgPro">
                                  <Image
                                    className="listingImg"
                                    radius="md"
                                    width={200}
                                    height={80}
                                    src={image}
                                    alt="House"
                                  />
                                </div>
                                <div className="listingTxt">
                                  <Text className="profileText" fz="lg">
                                    Location: {country}, {city}{" "}
                                  </Text>
                                  <Text className="profileText">
                                    Type of room: {typeOfRoom}
                                  </Text>
                                  <Text className="profileText">
                                    Places available: {placesAvailable}
                                  </Text>
                                </div>
                                <div className="listingsBttns">
                                  <button
                                    className="button"
                                    type="submit"
                                    onClick={() => handleModalListing(_id)}
                                    style={{ alignSelf: "center" }}
                                  >
                                    Edit details
                                  </button>
                                </div>
                              </Card>
                            </div>
                          </Skeleton>
                          <Modal
                            opened={isEditing}
                            onClose={() => setIsEditing(false)}
                          >
                            <form
                              onSubmit={handleEditDetails}
                              className="formEdit"
                            >
                              <label>
                                Country:{" "}
                                <input
                                  value={newCountry}
                                  onChange={(event) =>
                                    setNewCountry(event.target.value)
                                  }
                                />
                              </label>
                              <label>
                                City:{" "}
                                <input
                                  value={newCity}
                                  onChange={(event) =>
                                    setNewCity(event.target.value)
                                  }
                                />
                              </label>
                              <label>
                                Type of room:{" "}
                                <input
                                  value={newTypeOfRoom}
                                  onChange={(event) =>
                                    setNewTypeOfRoom(event.target.value)
                                  }
                                />
                              </label>
                              <label>
                                Rooms available:{" "}
                                <input
                                  value={newPlacesAvailable}
                                  onChange={(event) =>
                                    setNewPlacesAvailable(event.target.value)
                                  }
                                />
                              </label>
                              <label>
                                Image:{" "}
                                <input
                                  type="file"
                                  name="imageUrl"
                                  accept="image/png, image/jpg"
                                />
                              </label>

                              <button className="button" type="submit">
                                Update
                              </button>
                              <button
                                className="removeBtn"
                                type="button"
                                onClick={(event) => deleteListing(_id, event)}
                              >
                                Remove listing
                              </button>
                            </form>
                          </Modal>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HostProfile;
