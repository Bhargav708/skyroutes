package com.airlines.skyroutes.service;

import com.airlines.skyroutes.model.Flight;
import com.airlines.skyroutes.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {
    @Autowired
    FlightRepository repository;
    public List<Flight> getALlFlights() {
        return repository.findAll();
    }

    public Flight getFlightById(long id, String category) {
        Flight flight = repository.getReferenceById(id);

        // If the user selects Business Class, increase the cost by 40% (or any desired percentage)
        if ("Business".equalsIgnoreCase(category)) {
            flight.setCost(flight.getCost() * 1.4); // Increase cost by 40%
        }

        return flight;
    }


    public Flight addFlight(Flight flight) {
        return repository.save(flight);
    }

    public Flight updateFlight(Long id, Flight updatedFlight) {
        Flight flight = repository.getReferenceById(id);
        flight.setCompanyName(updatedFlight.getCompanyName());
        flight.setSource(updatedFlight.getSource());
        flight.setDestination(updatedFlight.getDestination());
        flight.setTime(updatedFlight.getTime());
        flight.setDate(updatedFlight.getDate());
        flight.setCost(updatedFlight.getCost());
        return repository.save(flight);
    }

    public String deleteFlight(Long id) {
        repository.deleteById(id);
        return "Flight deleted Successfully";
    }

    public List<Flight> getFlightBySourceAndDestination(String source, String destination) {
        return repository.findBySourceAndDestination(source,destination);
    }
}
