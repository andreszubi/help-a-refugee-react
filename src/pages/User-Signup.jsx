import NavBarMain from "../components/NavBarMain";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Alert } from '@mantine/core';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function UserSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const image = event.target.imageUrl.files[0];
      const fData = new FormData();
      fData.append("imageUrl", image);
      fData.append("email", email);
      fData.append("password", password);
      fData.append("firstName", firstName);
      fData.append("lastName", lastName);
      fData.append("aboutMe", aboutMe);
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/signup`,
        { method: "POST", body: fData }
      );
      const parsed = await response.json();
      
      if (response.status === 405) {
        setErrorMessage(parsed.message);
      } else if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <NavBarMain />
      
      <motion.div 
        className="transbox2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ padding: '2rem 1rem' }}
      >
        <motion.h1 className="largeTextSignUp" variants={itemVariants} style={{ position: 'relative', zIndex: 1 }}>
          Create Your Account
        </motion.h1>
        <motion.p className="mediumTextSignUp" variants={itemVariants} style={{ position: 'relative', zIndex: 1 }}>
          Join our community and find a safe place to stay
        </motion.p>
        
        {/* Two column layout */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
          maxWidth: '1100px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Welcome Card */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: '1 1 450px',
              maxWidth: '520px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(240, 253, 250, 0.12) 100%)',
              backdropFilter: 'blur(8px)',
              borderRadius: '28px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Wave effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
              animation: 'waveShimmer 10s linear infinite',
              pointerEvents: 'none'
            }} />
            
            {/* Welcome Icon - Open Arms */}
            <motion.div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.9) 0%, rgba(6, 182, 212, 0.85) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 12px 30px rgba(13, 148, 136, 0.3)',
                position: 'relative',
                zIndex: 1
              }}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg style={{ width: '36px', height: '36px' }} fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </motion.div>
            
            <motion.h2 
              style={{ 
                fontSize: '1.75rem', 
                marginBottom: '1rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}
              variants={itemVariants}
            >
              You Are Welcome Here
            </motion.h2>
            
            <motion.p 
              style={{ 
                color: '#1e3a3a', 
                fontSize: '1.05rem', 
                lineHeight: '1.9',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              variants={itemVariants}
            >
              We know the journey you've been through has been incredibly hard. The fear, the uncertainty, leaving everything behind; it takes immense courage. We see you. We honor your strength.
            </motion.p>
            
            <motion.p 
              style={{ 
                color: '#1e3a3a', 
                fontSize: '1rem', 
                lineHeight: '1.9',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              variants={itemVariants}
            >
              This is a place where you are safe. A place where you belong. A community of kind-hearted people who want nothing more than to help you and your family find peace and a fresh start.
            </motion.p>
            
            <motion.p 
              style={{ 
                color: '#1e3a3a', 
                fontSize: '1rem', 
                lineHeight: '1.9',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              variants={itemVariants}
            >
              You don't have to face this alone anymore. There are people here ready to open their homes and their hearts to you. Your story isn't over; this is a new chapter, and we're here to help you write it.
            </motion.p>
            
            {/* Comforting closing - Heart with text inside, heartbeat effect */}
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              marginTop: '1.5rem'
            }}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.06, 1, 1.04, 1]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  position: 'relative', 
                  width: '340px',
                  height: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Heart SVG as background */}
                <svg 
                  viewBox="0 0 24 24" 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%',
                    filter: 'drop-shadow(0 12px 35px rgba(13, 148, 136, 0.5))'
                  }}
                >
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(13, 148, 136, 0.35)" />
                      <stop offset="50%" stopColor="rgba(6, 182, 212, 0.3)" />
                      <stop offset="100%" stopColor="rgba(20, 184, 166, 0.3)" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#heartGradient)"
                    stroke="rgba(13, 148, 136, 0.5)"
                    strokeWidth="0.2"
                  />
                </svg>
                
                {/* Text inside heart */}
                <p 
                  style={{ 
                    position: 'relative',
                    zIndex: 2,
                    color: '#0d9488',
                    fontSize: '1.35rem', 
                    fontWeight: '800',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: 0,
                    lineHeight: '1.45',
                    textAlign: 'center',
                    padding: '0 2rem',
                    marginTop: '-30px',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
                  }}
                >
                  You are not alone.<br/>You are loved.<br/>You are home.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="signUpForm"
            variants={containerVariants}
            style={{ flex: '1 1 380px', maxWidth: '480px', margin: 0 }}
          >
            <motion.label variants={itemVariants}>
              Email
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              Password
              <input type="password" name="hashedPassword" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create a password" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              First Name
              <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              Last Name
              <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              About Me
              <input type="text" name="aboutMe" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder="Tell us about yourself" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              Profile Picture
              <input type="file" name="imageUrl" accept="image/png, image/jpg, image/jpeg" />
            </motion.label>
            
            {errorMessage && (
              <Alert title="Error" color="red">{errorMessage}</Alert>
            )}
            
            <motion.button 
              className="button" type="submit" disabled={isLoading}
              style={{ width: '100%', marginTop: '1rem' }}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </motion.button>

            <motion.p 
              style={{ color: '#1e3a3a', textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem', position: 'relative', zIndex: 1, textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}
              variants={itemVariants}
            >
              Already have an account? <Link to="/" className="signUpLink">Sign in</Link>
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default UserSignup;
