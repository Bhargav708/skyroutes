package com.airlines.skyroutes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SeatGenerator {

    public List<String> generateSeatNumbers(int flightId, int numberOfSeats) {
        List<String> seatNumbers = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < numberOfSeats; i++) {
            String seatNumber = generateRandomSeat(flightId, random);
            seatNumbers.add(seatNumber);
        }
        return seatNumbers;
    }

    private String generateRandomSeat(int flightId, Random random) {
        int row = random.nextInt(30) + 1; // Assuming max 30 rows
        char column = (char) ('A' + random.nextInt(6)); // Assuming 6 columns (A-F)
        return row + "" + column;
    }
}
