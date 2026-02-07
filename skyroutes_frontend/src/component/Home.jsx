import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("jwtToken");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBooking = () => {
    if (isLoggedIn) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center p-6">
      <motion.h1 
        className="text-5xl font-extrabold mb-6 text-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-blue-400">SkyRoutes Airlines</span>
      </motion.h1>
      
      <motion.p 
        className="text-lg mb-8 max-w-2xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Experience a seamless journey with SkyRoutes. Book flights effortlessly, select your preferred seats, and enjoy a premium travel experience.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <button 
          onClick={handleBooking} 
          className="bg-blue-500 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Book Your Flight
        </button>
      </motion.div>
    </div>
  );
};  

export default Home;
