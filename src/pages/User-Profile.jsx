import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import { motion, AnimatePresence } from "framer-motion";
import NavBarUser from "../components/NavBarUser";
import { Card, Modal, Text } from "@mantine/core";
import Footer from "../components/Footer";
import { Loader } from "@mantine/core";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const UserProfile = () => {
  const { token, currentUser, setCurrentUser, isLoading, setIsLoading } =
    useContext(SessionContextUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const place = "profile";

  const loadingTime = () => {
    if (currentUser) {
      const fetchUser = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/user/user/${
            currentUser.user._id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const parsed = await response.json();
        setEmail(parsed.email);
        setFirstName(parsed.firstName);
        setLastName(parsed.lastName);
        setAboutMe(parsed.aboutMe);
        setImage(parsed.image);
      };
      fetchUser();
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    
    try {
      const image = event.target.imageUrl.files[0];
      const fData = new FormData();
      fData.append("imageUrl", image);
      fData.append("email", email);
      fData.append("firstName", firstName);
      fData.append("lastName", lastName);
      fData.append("aboutMe", aboutMe);
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/user/edit/${
          currentUser.user._id
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fData,
        }
      );
      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadingTime();
  }, [currentUser]);

  return (
    <div className="appContainer">
      <NavBarUser place={place} />
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader color="teal" size="lg" />
        </div>
      ) : (
        <motion.div 
          className="transbox2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="font-link"
            variants={itemVariants}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h1 style={{ marginBottom: '1.5rem' }}>Welcome, {currentUser?.user?.firstName}!</h1>
          </motion.div>

          <motion.div 
            className="profileFull"
            variants={itemVariants}
            style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '450px' }}
          >
            <Card 
              shadow="xl" 
              p="xl" 
              radius="lg"
              className="w-full"
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)' }}
            >
              <div className="profileInfo">
                <motion.img
                  className="profileImage"
                  src={currentUser?.user?.image}
                  alt="Profile"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="allProfileText w-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>First Name:</span>
                      <Text className="profileText">{currentUser?.user?.firstName}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Last Name:</span>
                      <Text className="profileText">{currentUser?.user?.lastName}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>Email:</span>
                      <Text className="profileText">{currentUser?.user?.email}</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <span style={{ color: '#0d9488', fontWeight: '600', textShadow: '0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.5)' }}>About:</span>
                      <Text className="profileText">{currentUser?.user?.aboutMe || "No bio yet"}</Text>
                    </div>
                  </div>
                  
                  <motion.button
                    className="button profButton w-full mt-6"
                    type="button"
                    onClick={() => setIsEditing(true)}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>

          <Modal
            opened={isEditing}
            onClose={() => setIsEditing(false)}
            title="Edit Your Profile"
            size="md"
            centered
          >
            <form onSubmit={handleSubmit} className="formEdit space-y-4">
              <label>
                Profile Picture
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </label>
              <label>
                First Name
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Your first name"
                />
              </label>
              <label>
                Last Name
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Your last name"
                />
              </label>
              <label>
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                />
              </label>
              <label>
                About Me
                <input
                  value={aboutMe}
                  onChange={(event) => setAboutMe(event.target.value)}
                  placeholder="Tell us about yourself"
                />
              </label>
              <motion.button 
                className="button w-full mt-4" 
                type="submit"
                disabled={isSaving}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? "Saving..." : "Update Profile"}
              </motion.button>
            </form>
          </Modal>
        </motion.div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
