import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white p-6 flex flex-col md:flex-row justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-lg font-semibold text-center md:text-left"
        whileHover={{ scale: 1.05 }}
      >
        &copy; {new Date().getFullYear()} SkyRoutes Airlines. All rights reserved.
      </motion.h1>

      
    </motion.footer>
  );
};

export default Footer;
