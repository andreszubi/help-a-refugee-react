import { Card, Modal, Text, Image } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBarHost from "../components/NavBarHost";
import { SessionContextHost } from "../contexts/SessionContextHost";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

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
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserCity, setNewUserCity] = useState("");
  const [newUserCountry, setNewUserCountry] = useState("");
  const [newAboutMe, setNewAboutMe] = useState("");
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const setVisibilityForm = () => {
    setVisibleForm(!visibleForm);
  };

  const loadingTime = () => {
    if (currentPayload) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const fetchListings = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/host/listings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
    setIsSaving(true);
    
    try {
      const image = event.target.imageUrl.files[0];
      const fData = new FormData();
      fData.append("imageUrl", image);
      fData.append("country", newCountry);
      fData.append("city", newCity);
      fData.append("typeOfRoom", newTypeOfRoom);
      fData.append("placesAvailable", newPlacesAvailable);
      
      await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/host/listings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fData,
        }
      );
      fetchListings();
      setNewCountry("");
      setNewCity("");
      setNewPlacesAvailable("");
      setNewTypeOfRoom("");
      setNewImage("");
    } catch (err) {
      console.error("Error creating listing:", err);
    } finally {
      setIsSaving(false);
    }
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
    await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/host/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    fetchListings();
  };

  const handleEditDetails = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
      const image = event.target.imageUrl.files[0];
      const fData = new FormData();
      fData.append("imageUrl", image);
      fData.append("country", newCountry);
      fData.append("city", newCity);
      fData.append("typeOfRoom", newTypeOfRoom);
      fData.append("placesAvailable", newPlacesAvailable);
      
      await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/host/listings/${editId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fData,
        }
      );
      setIsEditing(false);
      fetchListings();
      setNewCountry("");
      setNewCity("");
      setNewPlacesAvailable("");
      setNewTypeOfRoom("");
      setNewImage("");
      setEditId("");
      setVisibilityForm();
    } catch (err) {
      console.error("Error updating listing:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/host/host/edit/${
          currentPayload.user._id
        }`,
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
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadingTime();
  }, []);

  return (
    <div className="appContainer">
      <NavBarHost />
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader color="teal" size="lg" />
        </div>
      ) : (
        <motion.div 
          className="transbox2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: '2rem' }}
        >
          <motion.div 
            className="font-link"
            variants={itemVariants}
            style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center' }}
          >
            <h1 style={{ marginBottom: '1.5rem' }}>Welcome, {currentPayload?.user?.firstName}!</h1>
          </motion.div>
          
          <div className="hostProfAll flex flex-col lg:flex-row gap-8 w-full" style={{ position: 'relative', zIndex: 1, padding: 0 }}>
            {/* Profile Card */}
            <motion.div 
              className="w-full lg:w-1/3"
              variants={itemVariants}
            >
              <Card 
                shadow="xl" 
                p="xl" 
                radius="lg"
                style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)' }}
              >
                <div className="profileInfo">
                  <motion.img
                    className="profileImage"
                    src={currentPayload?.user?.image}
                    alt="Profile"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="allProfileText w-full">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Name:</span>
                        <Text className="profileText">
                          {currentPayload?.user?.firstName} {currentPayload?.user?.lastName}
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Email:</span>
                        <Text className="profileText">{currentPayload?.user?.email}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Location:</span>
                        <Text className="profileText">
                          {currentPayload?.user?.city}, {currentPayload?.user?.country}
                        </Text>
                      </div>
                      <div className="flex items-start gap-2">
                        <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>About:</span>
                        <Text className="profileText">
                          {currentPayload?.user?.aboutMe || "No bio yet"}
                        </Text>
                      </div>
                    </div>
                    
                    <motion.button
                      className="button w-full mt-6"
                      type="button"
                      onClick={() => handleModalUser()}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Edit Profile Modal */}
            <Modal
              opened={isEditingUser}
              onClose={() => setIsEditingUser(false)}
              title="Edit Your Profile"
              size="md"
              centered
            >
              <form className="formEdit space-y-4" onSubmit={handleEditUser}>
                <label>
                  Profile Picture
                  <input
                    type="file"
                    name="imageUrl"
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </label>
                <label>
                  First Name
                  <input
                    value={newFirstName}
                    onChange={(event) => setNewFirstName(event.target.value)}
                  />
                </label>
                <label>
                  Last Name
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
                  Country
                  <input
                    value={newUserCountry}
                    onChange={(event) => setNewUserCountry(event.target.value)}
                  />
                </label>
                <label>
                  City
                  <input
                    value={newUserCity}
                    onChange={(event) => setNewUserCity(event.target.value)}
                  />
                </label>
                <label>
                  About Me
                  <input
                    value={newAboutMe}
                    onChange={(event) => setNewAboutMe(event.target.value)}
                  />
                </label>
                <motion.button 
                  className="button w-full mt-4" 
                  type="submit"
                  disabled={isSaving}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSaving ? "Saving..." : "Update Profile"}
                </motion.button>
              </form>
            </Modal>

            {/* Listings Section */}
            <motion.div 
              className="listingsList flex-1"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#134e4a', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Your Listings</h2>
                <motion.button
                  className="button"
                  type="button"
                  onClick={setVisibilityForm}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {visibleForm ? "Hide Form" : "Add New Listing"}
                </motion.button>
              </div>

              {/* Add Listing Form */}
              <AnimatePresence>
                {visibleForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <Card 
                      shadow="lg" 
                      p="xl" 
                      radius="lg"
                      style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)' }}
                    >
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#134e4a', marginBottom: '1rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Publish New Listing</h3>
                      <form className="formEdit space-y-4" onSubmit={(event) => handleSubmit(event)} style={{ background: 'transparent', padding: 0, boxShadow: 'none' }}>
                        <label>
                          Country
                          <input
                            type="text"
                            name="newCountry"
                            required
                            value={newCountry}
                            onChange={(event) => setNewCountry(event.target.value)}
                            placeholder="e.g., Germany"
                          />
                        </label>
                        <label>
                          City
                          <input
                            type="text"
                            name="newCity"
                            required
                            value={newCity}
                            onChange={(event) => setNewCity(event.target.value)}
                            placeholder="e.g., Berlin"
                          />
                        </label>
                        <label>
                          Type of Room
                          <input
                            type="text"
                            name="newTypeOfRoom"
                            required
                            value={newTypeOfRoom}
                            onChange={(event) => setNewTypeOfRoom(event.target.value)}
                            placeholder="e.g., Private Room"
                          />
                        </label>
                        <label>
                          Places Available
                          <input
                            type="number"
                            name="newPlacesAvailable"
                            required
                            value={newPlacesAvailable}
                            onChange={(event) => setNewPlacesAvailable(event.target.value)}
                            placeholder="e.g., 2"
                          />
                        </label>
                        <label>
                          Image
                          <input
                            type="file"
                            name="imageUrl"
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </label>
                        <motion.button 
                          className="button w-full" 
                          type="submit"
                          disabled={isSaving}
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSaving ? "Publishing..." : "Publish Listing"}
                        </motion.button>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Listings Grid */}
              <div className="space-y-4">
                {listings.map(
                  ({ _id, image, country, city, typeOfRoom, placesAvailable }) => (
                    <motion.div 
                      key={_id}
                      variants={itemVariants}
                      layout
                    >
                      <Card 
                        className="listing" 
                        shadow="lg" 
                        p="lg" 
                        radius="lg"
                        style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)' }}
                      >
                        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                          <Image
                            radius="lg"
                            width={150}
                            height={100}
                            src={image}
                            alt="Listing"
                            className="object-cover rounded-lg"
                          />
                          <div className="listingTxt flex-1">
                            <Text className="profileText" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                              {city}, {country}
                            </Text>
                            <Text className="profileText" style={{ fontSize: '0.9rem', color: '#5f7c7c' }}>
                              {typeOfRoom}
                            </Text>
                            <Text className="profileText" style={{ fontSize: '0.9rem', color: '#0d9488' }}>
                              {placesAvailable} places available
                            </Text>
                          </div>
                          <motion.button
                            className="button"
                            type="button"
                            onClick={() => handleModalListing(_id)}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Edit
                          </motion.button>
                        </div>
                      </Card>
                    </motion.div>
                  )
                )}
              </div>

              {listings.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  variants={itemVariants}
                >
                  <p style={{ color: '#5f7c7c', fontSize: '1.1rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>
                    You haven't created any listings yet.
                  </p>
                  <p style={{ color: '#5f7c7c', fontSize: '0.9rem', marginTop: '0.5rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>
                    Click "Add New Listing" to get started!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Edit Listing Modal */}
          <Modal
            opened={isEditing}
            onClose={() => setIsEditing(false)}
            title="Edit Listing"
            size="md"
            centered
          >
            <form onSubmit={handleEditDetails} className="formEdit space-y-4">
              <label>
                Country
                <input
                  value={newCountry}
                  onChange={(event) => setNewCountry(event.target.value)}
                />
              </label>
              <label>
                City
                <input
                  value={newCity}
                  onChange={(event) => setNewCity(event.target.value)}
                />
              </label>
              <label>
                Type of Room
                <input
                  value={newTypeOfRoom}
                  onChange={(event) => setNewTypeOfRoom(event.target.value)}
                />
              </label>
              <label>
                Places Available
                <input
                  value={newPlacesAvailable}
                  onChange={(event) => setNewPlacesAvailable(event.target.value)}
                />
              </label>
              <label>
                Image
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </label>
              <motion.button 
                className="button w-full" 
                type="submit"
                disabled={isSaving}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? "Saving..." : "Update Listing"}
              </motion.button>
              <motion.button
                className="removeBtn w-full"
                type="button"
                onClick={(event) => {
                  deleteListing(editId, event);
                  setIsEditing(false);
                }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete Listing
              </motion.button>
            </form>
          </Modal>
        </motion.div>
      )}
      <Footer />
    </div>
  );
}

export default HostProfile;
