package com.airlines.skyroutes.service;

import com.airlines.skyroutes.model.Booking;
import com.airlines.skyroutes.model.Flight;
import com.airlines.skyroutes.model.User;
import com.airlines.skyroutes.repository.BookingRepository;
import com.airlines.skyroutes.repository.FlightRepository;
import com.airlines.skyroutes.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    public Booking bookFlight(String username, Long flightId, String category, int seats) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        User user = userRepository.findByUsername(username);

        // Check seat availability
        if ("Business".equalsIgnoreCase(category) && flight.getBusinessSeatsAvailable() >= seats) {
            flight.setBusinessSeatsAvailable(flight.getBusinessSeatsAvailable() - seats);
        } else if ("Economy".equalsIgnoreCase(category) && flight.getEconomySeatsAvailable() >= seats) {
            flight.setEconomySeatsAvailable(flight.getEconomySeatsAvailable() - seats);
        } else {
            throw new RuntimeException("Not enough seats available");
        }

        // Generate multiple seat numbers based on the number of seats selected
        String seatNumbers = generateSeatNumbers(flightId, seats);

        // Calculate total cost
        double totalCost = flight.getCost() * seats;

        // Create booking
        Booking booking = new Booking();
        booking.setUsername(username);
        booking.setFlight(flight);
        booking.setCategory(category);
        booking.setNumberOfSeats(seats);
        booking.setTotalCost(totalCost);
        booking.setSeatNumber(seatNumbers); // Set multiple seat numbers
        booking.setBoardingPass("BP-" + UUID.randomUUID().toString());

        // Send email after booking
        try {
            emailService.sendReservationConfirmationEmail(
                    user.getEmail(),
                    user.getUsername(),
                    flight.getCompanyName(),
                    flight.getDate(),
                    flight.getTime(),
                    flight.getSource(),
                    flight.getDestination(),
                    booking.getCategory(),
                    booking.getNumberOfSeats(),
                    booking.getSeatNumber(), // Multiple seat numbers
                    booking.getTotalCost(),
                    booking.getBoardingPass()
            );
        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }

        // Save and return booking
        flightRepository.save(flight);
        return bookingRepository.save(booking);
    }

    public Booking getBookingDetails(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    // Generates multiple seat numbers based on the number of seats booked
    private String generateSeatNumbers(Long flightId, int numberOfSeats) {
        Set<String> seatNumbers = new HashSet<>();
        Random random = new Random();

        while (seatNumbers.size() < numberOfSeats) {
            int row = random.nextInt(30) + 1;  // Rows 1-30
            char seat = (char) ('A' + random.nextInt(6)); // Seats A-F
            String seatNumber = row + String.valueOf(seat);

            // Ensure the seat is not already booked
            if (!bookingRepository.existsBySeatNumberAndFlightId(seatNumber, flightId)) {
                seatNumbers.add(seatNumber);
            }
        }

        // Convert the set of seat numbers into a comma-separated string
        return String.join(", ", seatNumbers);
    }
    public List<Booking> getRecentBookings(String username) {
        return bookingRepository.findByUsernameOrderByIdDesc(username);
    }
}
