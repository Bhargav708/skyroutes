package com.airlines.skyroutes.controller;

import com.airlines.skyroutes.model.Flight;
import com.airlines.skyroutes.model.User;
import com.airlines.skyroutes.service.FlightService;
import com.airlines.skyroutes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    public FlightService service;
    @Autowired
    public UserService userService;

    @PostMapping("/add")
    public Flight addFlight(@RequestBody Flight flight) {
        return service.addFlight(flight);
    }

    @PutMapping("/update/{id}")
    public Flight updateFlight(@PathVariable Long id, @RequestBody Flight flight) {
        return service.updateFlight(id, flight);
    }

    @DeleteMapping("/delete/flight/{id}")
    public String deleteFlight(@PathVariable Long id) {
        service.deleteFlight(id);
        return "Flight deleted successfully!";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @DeleteMapping("/delete/user/{id}")
    public String deleteUser(@PathVariable long id) {
        return userService.deleteUSer(id);

    }

}
