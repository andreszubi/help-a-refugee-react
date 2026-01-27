import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { motion } from "framer-motion";
import ListingBox from "./ListingBox";
import { Loader } from "@mantine/core";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const ListingsSearchUser = () => {
  const { token, currentUser } = useContext(SessionContextUser);
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadingTime = () => {
    if (currentUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/listings`,
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
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  const filteredListings = listings?.filter((listing) =>
    listing.city.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center" style={{ minHeight: '40vh' }}>
          <Loader color="cyan" size="lg" />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: '0 1rem' }}
        >
          {/* Search Bar */}
          <motion.div 
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              <svg 
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#94a3b8' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="searchBar"
                placeholder="Search by city..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}
            variants={itemVariants}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0c4a6e' }}>
              Available Homes
            </h3>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
            </span>
          </motion.div>

          {/* Listings Grid */}
          <motion.div className="allListings" variants={containerVariants}>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <motion.div key={listing._id} variants={itemVariants}>
                  <ListingBox listing={listing} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}
                variants={itemVariants}
              >
                <svg 
                  style={{ width: '48px', height: '48px', margin: '0 auto 1rem', color: '#cbd5e1' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>No listings found</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>Try a different city</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ListingsSearchUser;
