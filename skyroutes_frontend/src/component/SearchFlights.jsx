import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const SearchFlights = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!source || !destination) {
      setError("Please enter both source and destination.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/user/search", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { source, destination },
      });

      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError("No flights found or API error.");
    }

    setLoading(false);
  };

  const handleBook = (flightId) => {
    navigate(`/book?flightId=${flightId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-200 mb-4 text-center">Search Flights</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Source"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <motion.button
          onClick={handleSearch}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Search
        </motion.button>
      </motion.div>

      {error && <motion.p className="text-red-500 mt-4">{error}</motion.p>}

      {loading && <Loader2 className="animate-spin w-8 h-8 text-blue-400 mt-6" />}

      <AnimatePresence>
        {searched && flights.length > 0 && (
          <motion.div
            className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-4xl overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4">Company</th>
                  <th className="py-2 px-4">Source</th>
                  <th className="py-2 px-4">Destination</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Cost</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <motion.tr
                    key={flight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-700 transition-all text-center"
                  >
                    <td className="py-2 px-4 border-b border-gray-600">{flight.companyName}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{flight.source}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{flight.destination}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{flight.date}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{flight.time}</td>
                    <td className="py-2 px-4 border-b border-gray-600">₹{flight.cost}</td>
                    <td className="py-2 px-4 border-b border-gray-600">
                      <motion.button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleBook(flight.id)}
                      >
                        Book
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
        {searched && flights.length === 0 && !loading && (
          <motion.p className="text-gray-400 mt-6">No flights found.</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchFlights;
