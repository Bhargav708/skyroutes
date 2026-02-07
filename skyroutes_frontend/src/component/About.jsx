import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-extrabold text-white text-center mb-6"
        >
          Welcome to <span className="text-blue-400">SkyRoutes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg text-gray-300 text-center mb-6"
        >
          SkyRoutes is a cutting-edge airline reservation system crafted to provide a seamless and efficient travel booking experience. Our platform integrates the latest technology to offer a smooth, hassle-free journey from booking to boarding.
        </motion.p>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-6 bg-white/10 rounded-xl shadow-lg border border-white/20"
          >
            <h2 className="text-xl font-semibold text-blue-300 mb-2">Seamless Flight Booking</h2>
            <p className="text-gray-300">Easily search, compare, and book flights with our intuitive interface. Filter by price, duration, and airline to find the perfect travel option.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="p-6 bg-white/10 rounded-xl shadow-lg border border-white/20"
          >
            <h2 className="text-xl font-semibold text-blue-300 mb-2">Real-Time Availability</h2>
            <p className="text-gray-300">Our system provides real-time flight availability and instant confirmations, ensuring you secure your seat without delays.</p>
          </motion.div>

          
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg text-blue-300 font-semibold text-center mt-6"
        >
          Experience the future of airline reservations with <span className="text-white">SkyRoutes</span> – where innovation meets convenience.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
