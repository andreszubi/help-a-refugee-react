import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBarMain from "../components/NavBarMain";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function BookingConfirmation() {
  return (
    <div className="appContainer">
      <NavBarMain />
      
      <motion.div 
        className="transbox2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Icon */}
        <motion.div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%)',
            boxShadow: '0 15px 40px rgba(34, 197, 94, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            zIndex: 1
          }}
          variants={itemVariants}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.h1 variants={itemVariants} style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          Reservation Confirmed!
        </motion.h1>
        
        <motion.p 
          className="mediumTextSignUp2"
          variants={itemVariants}
          style={{ position: 'relative', zIndex: 1 }}
        >
          Your host has received your reservation and will contact you by email to arrange all the details.
        </motion.p>
        
        <motion.p 
          style={{ color: '#1e3a3a', maxWidth: '500px', textAlign: 'center', marginBottom: '2.5rem', lineHeight: '1.8', position: 'relative', zIndex: 1, fontWeight: '500', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}
          variants={itemVariants}
        >
          Stay safe, and we hope everything works out well for you. You've taken an important step towards finding a secure place to stay.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Link to="/listings-search">
            <motion.button 
              className="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse More Listings
            </motion.button>
          </Link>
          <Link to="/user-profile">
            <motion.button 
              className="button"
              style={{ 
                background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.9) 0%, rgba(71, 85, 105, 0.9) 100%)',
                boxShadow: '0 8px 25px rgba(71, 85, 105, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go to Profile
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default BookingConfirmation;
