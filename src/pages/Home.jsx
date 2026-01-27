import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
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

function Home() {
  return (
    <div className="appContainer">
      <NavBar />

      <motion.div 
        className="transbox"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div 
          className="textBox"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hostTitle" variants={itemVariants}>
            Open your home,<br />change a life
          </motion.h1>
          <motion.p className="textLanding2" variants={itemVariants}>
            The Host a Refugee Network connects families seeking safety with compassionate hosts who have room to share.
          </motion.p>
          <motion.p className="textLanding2" variants={itemVariants} style={{ marginTop: '1.25rem' }}>
            Whether fleeing war, persecution, or natural disaster, everyone deserves a safe place to call home. Your spare room could be someone's fresh start.
          </motion.p>
          <motion.p 
            className="textLanding2" 
            variants={itemVariants} 
            style={{ 
              marginTop: '1.25rem', 
              color: '#0f766e', 
              fontWeight: '600',
              fontSize: '1.15rem'
            }}
          >
            Join our community of hosts making a real difference.
          </motion.p>
        </motion.div>
        
        <LoginForm />
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default Home;
