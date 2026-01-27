import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "@mantine/core";

function ListingBox({ listing }) {
  const { token, currentUser } = useContext(SessionContextUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
      setUserId(currentUser.user._id);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  const handleRent = async (event, id) => {
    event.preventDefault();
    setIsReserving(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/listings/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      
      if (response.status === 200) {
        navigate("/booking-confirmation");
      }
    } catch (err) {
      console.error("Error reserving listing:", err);
    } finally {
      setIsReserving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader color="cyan" size="sm" />
      </div>
    );
  }

  return (
    <motion.div 
      className="card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="w-full mb-4">
        <img 
          className="w-full h-44 object-cover rounded-xl"
          src={listing.image} 
          alt={`${listing.city} accommodation`}
        />
      </div>

      {/* Content */}
      <div className="w-full text-left space-y-2">
        <h2 style={{ fontSize: '1.15rem', fontWeight: '600', color: '#0c4a6e' }}>
          {listing.city}, {listing.country}
        </h2>
        
        <div className="space-y-1">
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <span style={{ color: '#0ea5e9' }}>Room:</span> {listing.typeOfRoom}
          </p>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            <span style={{ color: '#0ea5e9' }}>Places:</span> {listing.placesAvailable} available
          </p>
        </div>

        {/* Host Info */}
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e0f2fe', marginTop: '0.75rem' }}>
          <div className="flex items-center gap-3">
            {listing.owner?.image && (
              <img 
                src={listing.owner.image} 
                alt={listing.owner.firstName}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0f2fe' }}
              />
            )}
            <div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hosted by</p>
              <p style={{ fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>
                {listing.owner?.firstName} {listing.owner?.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ paddingTop: '1rem' }}>
          {listing.usedBy ? (
            <div className="listingInUse" style={{ textAlign: 'center' }}>
              Not Available
            </div>
          ) : (
            <motion.button
              className="button"
              style={{ width: '100%' }}
              type="button"
              onClick={(event) => handleRent(event, listing._id)}
              disabled={isReserving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isReserving ? "Reserving..." : "Request to Stay"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ListingBox;
