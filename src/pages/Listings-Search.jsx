import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { motion } from "framer-motion";
import NavBarUser from "../components/NavBarUser";
import AllListings from "../components/AllListings";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

function ListingsSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(SessionContextUser);
  const place = "search";

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  return (
    <div className="appContainer">
      {isLoading ? (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader color="teal" size="lg" />
        </div>
      ) : (
        <>
          <NavBarUser place={place} />
          <motion.div 
            className="transbox2"
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="largeTextSignUp2"
              variants={itemVariants}
              style={{ position: 'relative', zIndex: 1 }}
            >
              Find Your Safe Place
            </motion.h1>
            <motion.p 
              style={{ color: '#1e3a3a', textAlign: 'center', maxWidth: '550px', margin: '0 auto 2rem', padding: '0 1rem', position: 'relative', zIndex: 1, fontWeight: '500', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}
              variants={itemVariants}
            >
              Browse available homes from hosts ready to help. Use the search to find accommodations in your preferred city.
            </motion.p>
            <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
              <AllListings />
            </div>
          </motion.div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default ListingsSearch;
