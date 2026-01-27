import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
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

function ListingDetails() {
  const { token, currentUser } = useContext(SessionContextUser);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setListing(data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListing();
  }, [id, token]);
  
  const handleBook = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: currentUser?.user?._id,
        }),
      });
      
      if (response.status === 200) {
        navigate("/booking-confirmation");
      }
    } catch (err) {
      console.error("Error booking:", err);
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="appContainer min-h-screen flex justify-center items-center">
        <Loader color="grape" size="lg" />
      </div>
    );
  }

  return (
    <div className="appContainer min-h-screen">
      <NavBarUser place="search" />
      
      <motion.div 
        className="max-w-4xl mx-auto py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="glass-card overflow-hidden"
          variants={itemVariants}
        >
          {/* Image */}
          <motion.img 
            src={listing?.image} 
            alt={`${listing?.city} accommodation`}
            className="w-full h-64 md:h-96 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Content */}
          <div className="p-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              {listing?.city}, {listing?.country}
            </motion.h1>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6 my-8"
              variants={containerVariants}
            >
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Type of Room</p>
                    <p className="text-white font-medium">{listing?.typeOfRoom}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Places Available</p>
                    <p className="text-white font-medium">{listing?.placesAvailable}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Host Info */}
              <motion.div 
                className="bg-white/5 rounded-xl p-6"
                variants={itemVariants}
              >
                <h3 className="text-white font-semibold mb-4">Hosted by</h3>
                <div className="flex items-center gap-4">
                  {listing?.owner?.image && (
                    <img 
                      src={listing.owner.image} 
                      alt={listing.owner.firstName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/50"
                    />
                  )}
                  <div>
                    <p className="text-white font-medium text-lg">
                      {listing?.owner?.firstName} {listing?.owner?.lastName}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {listing?.owner?.city}, {listing?.owner?.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10"
              variants={itemVariants}
            >
              {listing?.usedBy ? (
                <div className="listingInUse text-center py-3 px-6">
                  This listing is currently unavailable
                </div>
              ) : (
                <motion.button 
                  className="button flex-1"
                  onClick={handleBook}
                  disabled={isBooking}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isBooking ? "Booking..." : "Book Now"}
                </motion.button>
              )}
              
              <motion.button 
                className="button flex-1"
                style={{ background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' }}
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go Back
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default ListingDetails;
