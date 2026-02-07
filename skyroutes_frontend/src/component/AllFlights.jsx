import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          console.error("No token found, user might not be authenticated");
          return;
        }

        const response = await axios.get("http://localhost:8080/user/allFlights", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleBookFlight = (flightId) => {
    navigate(`/book?flightId=${flightId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col p-6">
      <motion.h2 
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Available Flights
      </motion.h2>
      
      <div className="flex justify-center items-center flex-1 p-4">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full border-collapse text-gray-200">
            <thead>
              <tr className="bg-blue-700 text-white text-sm md:text-lg">
                <th className="py-3 px-5 border-b">Company</th>
                <th className="py-3 px-5 border-b">Source</th>
                <th className="py-3 px-5 border-b">Destination</th>
                <th className="py-3 px-5 border-b">Time</th>
                <th className="py-3 px-5 border-b">Date</th>
                <th className="py-3 px-5 border-b">Cost</th>
                <th className="py-3 px-5 border-b">Business Seats</th>
                <th className="py-3 px-5 border-b">Economy Seats</th>
                <th className="py-3 px-5 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <motion.tr
                  key={flight.id}
                  className="text-center hover:bg-gray-700 transition-all text-sm md:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="py-3 px-5 border-b">{flight.companyName}</td>
                  <td className="py-3 px-5 border-b">{flight.source}</td>
                  <td className="py-3 px-5 border-b">{flight.destination}</td>
                  <td className="py-3 px-5 border-b">{flight.time}</td>
                  <td className="py-3 px-5 border-b">{flight.date}</td>
                  <td className="py-3 px-5 border-b">₹{flight.cost}</td>
                  <td className="py-3 px-5 border-b">{flight.businessSeatsAvailable}</td>
                  <td className="py-3 px-5 border-b">{flight.economySeatsAvailable}</td>
                  <td className="py-3 px-5 border-b">
                    <motion.button
                      className="bg-blue-600 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
                      onClick={() => handleBookFlight(flight.id)}
                      whileHover={{ scale: 1.05 }}
                    >
                      Book
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllFlights;
