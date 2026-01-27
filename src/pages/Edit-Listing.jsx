import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

function EditListing() {
  const { token } = useContext(SessionContextHost);
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [placesAvailable, setPlacesAvailable] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
      const image = event.target.imageUrl?.files[0];
      const fData = new FormData();
      if (image) fData.append("imageUrl", image);
      fData.append("country", country);
      fData.append("city", city);
      fData.append("typeOfRoom", typeOfRoom);
      fData.append("placesAvailable", placesAvailable);
      
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/host/listings/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fData,
      });
      navigate("/host-profile");
    } catch (err) {
      console.error("Error updating listing:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/host/listings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/host-profile");
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  return (
    <div className="appContainer min-h-screen">
      <NavBar />
      
      <motion.div 
        className="py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="largeTextSignUp"
          variants={itemVariants}
        >
          Edit Listing
        </motion.h1>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          variants={containerVariants}
        >
          <motion.label variants={itemVariants}>
            Country
            <input
              type="text"
              name="country"
              value={country}
              required
              onChange={(event) => setCountry(event.target.value)}
              placeholder="e.g., Germany"
            />
          </motion.label>
          
          <motion.label variants={itemVariants}>
            City
            <input
              type="text"
              name="city"
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
              placeholder="e.g., Berlin"
            />
          </motion.label>
          
          <motion.label variants={itemVariants}>
            Type of Room
            <input
              type="text"
              name="typeOfRoom"
              value={typeOfRoom}
              required
              onChange={(event) => setTypeOfRoom(event.target.value)}
              placeholder="e.g., Private Room"
            />
          </motion.label>
          
          <motion.label variants={itemVariants}>
            Places Available
            <input
              type="number"
              name="placesAvailable"
              value={placesAvailable}
              required
              onChange={(event) => setPlacesAvailable(event.target.value)}
              placeholder="e.g., 2"
            />
          </motion.label>
          
          <motion.label variants={itemVariants}>
            Image
            <input
              type="file"
              name="imageUrl"
              accept="image/png, image/jpg, image/jpeg"
            />
          </motion.label>
          
          <motion.div 
            className="flex flex-col gap-3 mt-6"
            variants={itemVariants}
          >
            <motion.button 
              className="button w-full" 
              type="submit"
              disabled={isSaving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? "Saving..." : "Update Listing"}
            </motion.button>
            
            <motion.button 
              className="removeBtn w-full" 
              type="button"
              onClick={handleDelete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Delete Listing
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default EditListing;
