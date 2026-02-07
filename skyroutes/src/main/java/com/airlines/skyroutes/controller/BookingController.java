package com.airlines.skyroutes.controller;

import com.airlines.skyroutes.model.Booking;
import com.airlines.skyroutes.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping("/book")
    public Booking bookFlight(@RequestParam String username,
                              @RequestParam Long flightId,
                              @RequestParam String category,
                              @RequestParam int seats) {
        return bookingService.bookFlight(username, flightId, category, seats);
    }



        @GetMapping("/boarding-pass/{id}")
        public ResponseEntity<?> getBookingDetails(@PathVariable Long id, @RequestHeader("Authorization") String token) {
            try {
                Booking booking = bookingService.getBookingDetails(id);
                return ResponseEntity.ok(booking);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
            }
        }

    @GetMapping("/recent/{username}")
    public List<Booking> getRecentBookings(@PathVariable String username) {
        return bookingService.getRecentBookings(username);
    }
    }


