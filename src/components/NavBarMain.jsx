import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBarMain() {
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
      <div className="buttons" style={{ visibility: 'hidden' }}>
        {/* Placeholder to maintain layout */}
        <span style={{ padding: '0.85rem 1.75rem' }}></span>
      </div>
    </motion.nav>
  );
}

export default NavBarMain;
