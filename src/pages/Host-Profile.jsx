import { Modal, Text } from "@mantine/core";
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
            {/* Profile Card - Glass style matching home page */}
            <motion.div 
              className="w-full lg:w-auto"
              variants={itemVariants}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 253, 250, 0.12) 100%)',
                backdropFilter: 'blur(8px) saturate(130%)',
                WebkitBackdropFilter: 'blur(8px) saturate(130%)',
                borderRadius: '28px',
                padding: '1.5rem 2rem',
                boxShadow: '0 20px 60px rgba(13, 148, 136, 0.03)',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '320px',
                alignSelf: 'flex-start'
              }}
            >
              {/* Wave shimmer effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
                animation: 'waveShimmer 10s linear infinite',
                pointerEvents: 'none'
              }} />
              
              <div className="profileInfo" style={{ position: 'relative', zIndex: 1 }}>
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
                      <Text style={{ color: '#1e3a3a', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>
                        {currentPayload?.user?.firstName} {currentPayload?.user?.lastName}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Email:</span>
                      <Text style={{ color: '#1e3a3a', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>{currentPayload?.user?.email}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Location:</span>
                      <Text style={{ color: '#1e3a3a', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>
                        {currentPayload?.user?.city}, {currentPayload?.user?.country}
                      </Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>About:</span>
                      <Text style={{ color: '#1e3a3a', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>
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
                <h2 style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Your Listings</h2>
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
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 253, 250, 0.12) 100%)',
                        backdropFilter: 'blur(8px) saturate(130%)',
                        WebkitBackdropFilter: 'blur(8px) saturate(130%)',
                        borderRadius: '28px',
                        padding: '2rem',
                        boxShadow: '0 20px 60px rgba(13, 148, 136, 0.03)',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '480px'
                      }}
                    >
                      {/* Wave shimmer effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
                        animation: 'waveShimmer 10s linear infinite',
                        pointerEvents: 'none'
                      }} />
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ 
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', 
                          fontWeight: '700', 
                          marginBottom: '1.5rem',
                          textAlign: 'center'
                        }}>Publish New Listing</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div>
                            <label style={{ color: '#134e4a', fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                              Country
                            </label>
                            <input
                              type="text"
                              name="newCountry"
                              required
                              value={newCountry}
                              onChange={(event) => setNewCountry(event.target.value)}
                              placeholder="e.g., Germany"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '25px',
                                padding: '0.875rem 1.25rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                color: '#374151',
                                fontSize: '0.95rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ color: '#134e4a', fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                              City
                            </label>
                            <input
                              type="text"
                              name="newCity"
                              required
                              value={newCity}
                              onChange={(event) => setNewCity(event.target.value)}
                              placeholder="e.g., Berlin"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '25px',
                                padding: '0.875rem 1.25rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                color: '#374151',
                                fontSize: '0.95rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ color: '#134e4a', fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                              Type of Room
                            </label>
                            <input
                              type="text"
                              name="newTypeOfRoom"
                              required
                              value={newTypeOfRoom}
                              onChange={(event) => setNewTypeOfRoom(event.target.value)}
                              placeholder="e.g., Private Room"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '25px',
                                padding: '0.875rem 1.25rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                color: '#374151',
                                fontSize: '0.95rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ color: '#134e4a', fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                              Places Available
                            </label>
                            <input
                              type="number"
                              name="newPlacesAvailable"
                              required
                              value={newPlacesAvailable}
                              onChange={(event) => setNewPlacesAvailable(event.target.value)}
                              placeholder="e.g., 2"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '25px',
                                padding: '0.875rem 1.25rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                color: '#374151',
                                fontSize: '0.95rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ color: '#134e4a', fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                              Image
                            </label>
                            <input
                              type="file"
                              name="imageUrl"
                              accept="image/png, image/jpg, image/jpeg"
                              style={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: '2px dashed #0d9488', 
                                borderRadius: '25px',
                                padding: '0.875rem 1.25rem',
                                width: '100%',
                                boxSizing: 'border-box',
                                color: '#374151',
                                fontSize: '0.95rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                outline: 'none',
                                cursor: 'pointer'
                              }}
                            />
                          </div>
                          <motion.button 
                            className="button w-full" 
                            type="submit"
                            disabled={isSaving}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.preventDefault();
                              const formEvent = { 
                                preventDefault: () => {}, 
                                target: { 
                                  imageUrl: { files: document.querySelector('input[name="imageUrl"]').files }
                                }
                              };
                              handleSubmit(formEvent);
                            }}
                          >
                            {isSaving ? "Publishing..." : "Publish Listing"}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Listings Grid - Card Layout */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
                gap: '2rem',
                justifyItems: 'center'
              }}>
                {listings && listings.length > 0 && listings.map(
                  ({ _id, image, country, city, typeOfRoom, placesAvailable }) => (
                    <motion.div 
                      key={_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', maxWidth: '500px' }}
                    >
                      <div 
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 253, 250, 0.12) 100%)',
                          backdropFilter: 'blur(8px) saturate(130%)',
                          WebkitBackdropFilter: 'blur(8px) saturate(130%)',
                          borderRadius: '28px',
                          padding: '1.5rem',
                          boxShadow: '0 20px 60px rgba(13, 148, 136, 0.03)',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Wave shimmer effect */}
                        <div style={{
                          position: 'absolute',
                          top: '-50%',
                          left: '-50%',
                          width: '200%',
                          height: '200%',
                          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
                          animation: 'waveShimmer 15s linear infinite',
                          pointerEvents: 'none'
                        }} />
                        
                        {/* Image */}
                        <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
                          <img
                            src={image}
                            alt="Listing"
                            style={{ 
                              width: '100%', 
                              height: '300px', 
                              objectFit: 'cover', 
                              borderRadius: '20px',
                              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                        </div>
                        
                        {/* Details */}
                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1rem' }}>
                          <p style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: '700', 
                            color: '#134e4a', 
                            margin: '0 0 0.75rem 0', 
                            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' 
                          }}>
                            <span style={{ color: '#0d9488' }}>Location:</span> {city}, {country}
                          </p>
                          <p style={{ 
                            fontSize: '1.1rem', 
                            color: '#1e3a3a', 
                            fontWeight: '500',
                            margin: '0 0 0.5rem 0', 
                            textShadow: '0 1px 3px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)' 
                          }}>
                            <span style={{ color: '#0d9488', fontWeight: '600' }}>Type of Room:</span> {typeOfRoom}
                          </p>
                          <p style={{ 
                            fontSize: '1.1rem', 
                            color: '#1e3a3a', 
                            fontWeight: '500', 
                            margin: '0 0 1.5rem 0', 
                            textShadow: '0 1px 3px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 0.8)' 
                          }}>
                            <span style={{ color: '#0d9488', fontWeight: '600' }}>Number of places:</span> {placesAvailable}
                          </p>
                          <motion.button
                            className="button"
                            type="button"
                            onClick={() => handleModalListing(_id)}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ width: '100%', padding: '0.875rem 1.5rem', fontSize: '1rem' }}
                          >
                            Edit Listing
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

              {(!listings || listings.length === 0) && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 253, 250, 0.12) 100%)',
                    backdropFilter: 'blur(8px) saturate(130%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(130%)',
                    borderRadius: '28px',
                    padding: '3rem 2rem',
                    boxShadow: '0 20px 60px rgba(13, 148, 136, 0.03)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Wave shimmer effect */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
                    animation: 'waveShimmer 10s linear infinite',
                    pointerEvents: 'none'
                  }} />
                  <p style={{ color: '#134e4a', fontSize: '1.1rem', fontWeight: '600', margin: 0, position: 'relative', zIndex: 1, textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)' }}>
                    You haven't created any listings yet.
                  </p>
                  <p style={{ color: '#5f7c7c', fontSize: '0.95rem', marginTop: '0.75rem', fontWeight: '500', position: 'relative', zIndex: 1, textShadow: '0 1px 2px rgba(255, 255, 255, 0.9)' }}>
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
