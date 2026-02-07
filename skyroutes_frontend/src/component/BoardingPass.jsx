import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const BoardingPass = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/bookings/boarding-pass/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setBooking(response.data);
      } catch (err) {
        setError("Failed to fetch booking details.");
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl bg-gray-900">
        {error}
      </div>
    );

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl bg-gray-900">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        className="relative bg-gray-800/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-700 w-full max-w-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold mb-6 tracking-wide text-gray-200">Boarding Pass</h2>

        <div className="border border-gray-700 p-6 rounded-lg shadow-md bg-gray-900/70">
          <p className="text-xl font-semibold mb-4 text-gray-300">
            {booking.flight.companyName} ({booking.flight.id})
          </p>
          <div className="text-gray-400 space-y-3 text-lg">
            <p><strong>Passenger:</strong> {booking.username}</p>
            <p><strong>Route:</strong> {booking.flight.source} ➝ {booking.flight.destination}</p>
            <p><strong>Date:</strong> {booking.flight.date}</p>
            <p><strong>Time:</strong> {booking.flight.time}</p>
            <p><strong>Category:</strong> {booking.category}</p>
            <p><strong>Seats:</strong> {booking.numberOfSeats}</p>
            <p className="text-lg font-semibold text-purple-400">
              <strong>Seat Number:</strong> {booking.seatNumber}
            </p>
            <p className="text-lg font-semibold text-green-400">
              <strong>Total Cost:</strong> ₹{booking.totalCost}
            </p>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-lg">
            <QRCodeCanvas value={booking.boardingPass} size={150} />
            <p className="text-gray-400 text-sm mt-3">Scan to verify boarding</p>
          </div>

          {/* Go Home Button */}
          <motion.button
            className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg w-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BoardingPass;
