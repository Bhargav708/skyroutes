import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !token) {
      console.error("No username or token found. Please log in.");
      return;
    }

    axios
      .get(`http://localhost:8080/bookings/recent/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [username, token]);

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-6">
      <motion.div
        className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-4xl text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">Recent Bookings</h2>

        {bookings.length > 0 ? (
          <motion.ul
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {bookings.map((booking) => (
              <motion.li
                key={booking.id}
                className="border border-gray-700 p-6 rounded-lg shadow-lg bg-gray-900 text-white transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-lg font-semibold text-blue-400">
                      {booking.flight.companyName}
                    </p>
                    <p className="text-gray-400">
                      <strong>Route:</strong> {booking.flight.source} ➝ {booking.flight.destination}
                    </p>
                    <p className="text-gray-400">
                      <strong>Date:</strong> {booking.flight.date}
                    </p>
                    <p className="text-gray-400">
                      <strong>Time:</strong> {booking.flight.time}
                    </p>
                    <p className="text-gray-400">
                      <strong>Category:</strong> {booking.category}
                    </p>
                    <p className="text-gray-400">
                      <strong>Seats:</strong> {booking.numberOfSeats}
                    </p>
                    <p className="text-gray-400">
                      <strong>Total Cost:</strong> ₹{booking.totalCost}
                    </p>
                  </div>
                  <motion.button
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/boarding-pass/${booking.id}`)}
                  >
                    View Boarding Pass
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.p
            className="text-center text-gray-400 text-lg mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            No recent bookings found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default RecentBookings;
