import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar() {
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
        <Link to="/host-signup">
          <motion.button 
            className="button" 
            type="button"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Host Signup
          </motion.button>
        </Link>
        <Link to="/host-login">
          <motion.button 
            className="button" 
            type="button"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Host Login
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}

export default NavBar;
