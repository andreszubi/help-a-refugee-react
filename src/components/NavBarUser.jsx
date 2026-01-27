import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NavBarUser({ place }) {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.nav 
      className="NavBar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.08,
          y: -3,
          rotate: [0, -1, 1, 0]
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          rotate: { duration: 0.3 }
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Link to="/" className="text-logo">
          Host a <span>Refugee</span>
        </Link>
      </motion.div>
      <div className="buttons">
        {place === "profile" ? (
          <Link to="/listings-search">
            <motion.button 
              className="button" 
              type="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Find a Host
            </motion.button>
          </Link>
        ) : (
          <Link to="/user-profile">
            <motion.button 
              className="button" 
              type="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              My Profile
            </motion.button>
          </Link>
        )}
        <motion.button 
          className="button" 
          type="button" 
          onClick={logout}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.9) 0%, rgba(71, 85, 105, 0.9) 100%)',
            boxShadow: '0 8px 25px rgba(71, 85, 105, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default NavBarUser;
