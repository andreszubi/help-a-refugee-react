import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const impactItems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "A Safe Place to Call Home",
    description: "You provide more than shelter; you offer a sanctuary where families can feel secure after fleeing danger and uncertainty."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Hope & Human Connection",
    description: "Your kindness restores faith in humanity. A warm welcome can heal wounds that no medicine can touch."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "A Fresh Start",
    description: "You help families rebuild their lives: children can go back to school, parents can find work, and dreams can be reborn."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Bridge Cultures",
    description: "Experience the richness of sharing stories, traditions, and meals. Both families grow through this beautiful exchange."
  }
];

function HostSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
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
      fData.append("country", country);
      fData.append("city", city);
      fData.append("aboutMe", aboutMe);
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/host/signup`,
        { method: "POST", body: fData }
      );
      const parsed = await response.json();
      
      if (response.status === 405) {
        setErrorMessage(parsed.message);
      } else if (response.status === 201) {
        navigate("/host-login");
      }
    } catch (err) {
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <NavBar />
      
      <motion.div 
        className="transbox2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ padding: '2rem 1rem' }}
      >
        <motion.h1 className="largeTextSignUp" variants={itemVariants} style={{ position: 'relative', zIndex: 1 }}>
          Become a Host
        </motion.h1>
        <motion.p className="mediumTextSignUp" variants={itemVariants} style={{ position: 'relative', zIndex: 1 }}>
          Open your home and help someone find safety
        </motion.p>
        
        {/* Two column layout */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
          maxWidth: '1100px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Impact Card */}
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
            
            <motion.h2 
              style={{ 
                fontSize: '1.75rem', 
                marginBottom: '0.75rem',
                position: 'relative',
                zIndex: 1
              }}
              variants={itemVariants}
            >
              Your Impact Matters
            </motion.h2>
            
            <motion.p 
              style={{ 
                color: '#1e3a3a', 
                fontSize: '1rem', 
                lineHeight: '1.8',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              variants={itemVariants}
            >
              When you open your door, you open a world of possibilities for families who have lost everything. Here's what your generosity means to them:
            </motion.p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              {impactItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.9) 0%, rgba(6, 182, 212, 0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(13, 148, 136, 0.25)'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      color: '#134e4a', 
                      fontSize: '1.1rem', 
                      fontWeight: '700',
                      marginBottom: '0.25rem',
                      textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ 
                      color: '#1e3a3a', 
                      fontSize: '0.95rem', 
                      lineHeight: '1.7',
                      margin: 0,
                      textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
                    }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Heartfelt quote - Heart with heartbeat effect */}
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              marginTop: '2rem'
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
                  width: '420px',
                  height: '400px',
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
                    <linearGradient id="heartGradientHost" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(13, 148, 136, 0.35)" />
                      <stop offset="50%" stopColor="rgba(6, 182, 212, 0.3)" />
                      <stop offset="100%" stopColor="rgba(20, 184, 166, 0.3)" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#heartGradientHost)"
                    stroke="rgba(13, 148, 136, 0.5)"
                    strokeWidth="0.2"
                  />
                </svg>
                
                {/* Quote text inside heart */}
                <div 
                  style={{ 
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '0 3.5rem',
                    marginTop: '-35px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <p style={{ 
                    color: '#134e4a', 
                    fontSize: '1rem', 
                    fontStyle: 'italic',
                    fontWeight: '600',
                    lineHeight: '1.6',
                    margin: 0,
                    textAlign: 'center',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
                  }}>
                    "We lost our home, but found a family. Our host didn't just give us a room; they gave us back our hope and our smiles. Our children laugh again."
                  </p>
                  <p style={{ 
                    color: '#0d9488', 
                    fontSize: '0.9rem', 
                    fontWeight: '700',
                    marginTop: '0.75rem',
                    marginBottom: 0,
                    textAlign: 'center',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
                  }}>
                    A refugee family from Syria
                  </p>
                </div>
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
              <input type="email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              Password
              <input type="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
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
              Country
              <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Your country" />
            </motion.label>
            
            <motion.label variants={itemVariants}>
              City
              <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" />
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
              {isLoading ? "Creating account..." : "Sign Up as Host"}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default HostSignup;
