import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBarMain from "../components/NavBarMain";
import Footer from "../components/Footer";

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

function ErrorPage() {
  return (
    <div className="appContainer">
      <NavBarMain />
      
      <motion.div 
        className="transbox2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Badge */}
        <motion.div 
          className="text-8xl font-bold mb-6"
          style={{ 
            background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 40%, #06b6d4 70%, #22c55e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 1
          }}
          variants={itemVariants}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          404
        </motion.div>

        <motion.h1 variants={itemVariants} style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          Page Not Found
        </motion.h1>
        
        <motion.p 
          style={{ color: '#1e3a3a', maxWidth: '400px', textAlign: 'center', marginBottom: '2.5rem', lineHeight: '1.8', position: 'relative', zIndex: 1, fontWeight: '500', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}
          variants={itemVariants}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Link to="/">
            <motion.button 
              className="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </Link>
          <motion.button 
            className="button"
            style={{ 
              background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.9) 0%, rgba(71, 85, 105, 0.9) 100%)',
              boxShadow: '0 8px 25px rgba(71, 85, 105, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            onClick={() => window.history.back()}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default ErrorPage;
