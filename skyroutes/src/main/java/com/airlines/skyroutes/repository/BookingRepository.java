package com.airlines.skyroutes.repository;

import com.airlines.skyroutes.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    boolean existsBySeatNumberAndFlightId(String seatNumber, Long flightId);
    List<Booking> findByUsername(String username);
    List<Booking> findByUsernameOrderByIdDesc(String username);
}
