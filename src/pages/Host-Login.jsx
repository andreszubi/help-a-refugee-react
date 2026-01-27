import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { SessionContextHost } from "../contexts/SessionContextHost";
import { useState, useContext } from "react";
import Footer from "../components/Footer";
import { Alert } from "@mantine/core";

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

function HostLogin() {
  const { setToken } = useContext(SessionContextHost);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/host/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const parsed = await response.json();

      if (response.status === 200) {
        // Set the token first
        setToken(parsed.token);
        
        // Verify the token is working before navigating
        const verifyResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/host/verify`,
          {
            headers: {
              Authorization: `Bearer ${parsed.token}`,
            },
          }
        );
        const verifyParsed = await verifyResponse.json();
        
        if (verifyParsed.message === "Token OK") {
          // Small delay to ensure context state is updated
          setTimeout(() => {
            navigate("/host-profile");
          }, 100);
        } else {
          setError("Authentication failed. Please try again.");
        }
      } else if (response.status === 400 || response.status === 404) {
        setError(parsed.message);
      }
    } catch (err) {
      setError("Connection error. Please try again.");
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
          Welcome Back, Host
        </motion.h1>
        <motion.p className="mediumTextSignUp" variants={itemVariants} style={{ position: 'relative', zIndex: 1 }}>
          Sign in to manage your listings
        </motion.p>
        
        {/* Two column layout */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
          maxWidth: '1000px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Gratitude Card */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: '1 1 400px',
              maxWidth: '480px',
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
            
            {/* Heart Icon */}
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
              <svg className="w-9 h-9" fill="white" viewBox="0 0 24 24" style={{ width: '36px', height: '36px' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
            
            <motion.h2 
              style={{ 
                fontSize: '1.6rem', 
                marginBottom: '1rem',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}
              variants={itemVariants}
            >
              Thank You for Being a Hero
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
              Every time you log in, you're not just managing listings; you're continuing a journey of compassion that transforms lives. Your dedication gives families a chance to dream again.
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
              Because of hosts like you, <span style={{ color: '#0d9488', fontWeight: '600' }}>thousands of families</span> have found warmth, safety, and the courage to start anew. You are building a better world, one home at a time.
            </motion.p>
            
            <motion.p 
              style={{ 
                color: '#1e3a3a', 
                fontSize: '0.95rem', 
                lineHeight: '1.8',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}
              variants={itemVariants}
            >
              The smiles you've created, the tears of joy you've inspired, and the futures you've made possible; these are your legacy. From the bottom of our hearts and from every family you've touched:
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}
            >
              <p style={{ 
                color: '#0f766e',
                fontSize: '1.5rem', 
                fontWeight: '800',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                margin: 0,
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)'
              }}>
                Thank you for everything.
              </p>
              <p style={{ 
                color: '#5f7c7c', 
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.9)'
              }}>
                With gratitude, The Host a Refugee Community
              </p>
            </motion.div>
          </motion.div>

          {/* Login Form */}
          <motion.form 
            className="signUpForm" 
            onSubmit={handleSubmit}
            variants={containerVariants}
            style={{ flex: '1 1 400px', maxWidth: '480px', margin: 0, padding: '3rem' }}
          >
            <motion.label variants={itemVariants}>
              Email
              <input type="email" id="email" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            </motion.label>

            <motion.label variants={itemVariants}>
              Password
              <input type="password" id="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </motion.label>
            
            {error && (
              <Alert title="Error" color="red">{error}</Alert>
            )}
            
            <motion.button 
              className="button" type="submit" disabled={isLoading}
              style={{ width: '100%', marginTop: '1rem' }}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>

            <motion.p 
              style={{ color: '#1e3a3a', textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem', position: 'relative', zIndex: 1, textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}
              variants={itemVariants}
            >
              New host? <Link to="/host-signup" className="signUpLink">Create an account</Link>
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default HostLogin;
