import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  // Function to handle Flights Navigation
  const handleFlightsNavigation = () => {
    if (isLoggedIn) {
      navigate("/allFlights");
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-md fixed top-0 w-full z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-white text-3xl font-bold cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/">SkyRoutes</Link>
        </motion.h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          <motion.button
            className="text-white text-lg font-semibold hover:text-gray-400"
            onClick={handleFlightsNavigation}
            whileHover={{ scale: 1.1 }}
          >
            Flights
          </motion.button>

          {isLoggedIn ? (
            <div className="relative">
              {/* Profile Button */}
              <motion.button
                className="flex items-center space-x-2 text-white font-semibold hover:text-gray-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.1 }}
              >
                <User className="w-6 h-6 text-green-400" />
                <span>{username || "User"}</span>
              </motion.button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-black text-black rounded-lg shadow-lg py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DropdownItem to="/mybookings"  label="My Bookings" />
                  <motion.button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-500"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </div>
          ) : (
            <NavItem to="/login" label="Login" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-white w-8 h-8" />
            ) : (
              <Menu className="text-white w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden  p-4 space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavItem to="/" label="Home" mobile />
          <NavItem to="/about" label="About" mobile />
          <motion.button
            className="text-white text-lg font-semibold hover:text-gray-400 block w-full"
            onClick={handleFlightsNavigation}
            whileHover={{ scale: 1.1 }}
          >
            Flights
          </motion.button>

          {isLoggedIn ? (
            <>
              <motion.span className="text-green-400 font-semibold text-lg block">
                {username || "User"}
              </motion.span>
              <DropdownItem  to="/mybookings" label="My Bookings" mobile />
              <motion.button
                className="px-4 py-2 bg-red-500 text-white rounded-lg w-full hover:bg-red-600"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <NavItem to="/login" label="Login" mobile />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// Reusable Navigation Item
const NavItem = ({ to, label, mobile }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        to={to}
        className={`text-white  text-lg font-semibold hover:text-gray-400 ${
          mobile ? "block" : ""
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

// Dropdown Item Component
const DropdownItem = ({ to, label, mobile }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        to={to}
        className={`block px-4 py-2 text-white hover:text-gray-400 ${
          mobile ? "text-center" : ""
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default Navbar;
