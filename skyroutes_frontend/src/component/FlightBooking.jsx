import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const FlightBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const flightId = searchParams.get("flightId");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("Economy");
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setError("No username found. Please log in.");
    }
  }, []);

  const handleBooking = async () => {
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!flightId) {
      setError("Flight ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/bookings/book",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            username,
            flightId,
            category,
            seats,
          },
        }
      );

      setSuccess(`Booking successful! Booking ID: ${response.data.id}`);
      setError("");
      setTimeout(() => navigate(`/boarding-pass/${response.data.id}`), 2000);
    } catch (error) {
      console.error("Error booking flight:", error);
      setError("Booking failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <motion.div
        className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-2xl text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6">Flight Booking</h2>

        {error && <motion.p className="text-red-400 mb-4">{error}</motion.p>}
        {success && <motion.p className="text-green-400 mb-4">{success}</motion.p>}

        <p className="font-medium text-lg text-gray-300 mb-4">Flight Number: {flightId}</p>
        <p className="font-medium text-lg text-gray-300 mb-4">User: {username}</p>

        <div className="space-y-4">
          <select
            className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>

          <input
            type="number"
            placeholder="Seats"
            className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
          />

          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition-all flex justify-center items-center"
            onClick={handleBooking}
            whileHover={{ scale: 1.05 }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Confirm Booking"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightBooking;
