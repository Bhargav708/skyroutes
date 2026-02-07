package com.airlines.skyroutes.controller;

import com.airlines.skyroutes.model.Flight;
import com.airlines.skyroutes.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {
    @Autowired
    public FlightService service;

    @GetMapping("/allFlights")
    public List<Flight> getAllFlights() {
        return service.getALlFlights();
    }
    @GetMapping("/{id}")
    public Flight getByid(@PathVariable long id,@RequestParam(required = false) String category) {
        return service.getFlightById(id,category);
    }
    @GetMapping("/search")
    public List<Flight> getBySourceDestination(@RequestParam String source,@RequestParam String destination) {
        return  service.getFlightBySourceAndDestination(source,destination);
    }



}
