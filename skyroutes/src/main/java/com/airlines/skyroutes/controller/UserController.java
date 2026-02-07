package com.airlines.skyroutes.controller;

import com.airlines.skyroutes.model.User;
import com.airlines.skyroutes.service.JwtService;
import com.airlines.skyroutes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")

public class UserController {
    @Autowired
    UserService service;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        user.setRole("ROLE_USER");
        return service.addUser(user);
    }

    @PostMapping("/register-admin")
    public User registerAdmin(@RequestBody User user) {
        user.setRole("ROLE_ADMIN");
        return service.addUser(user);
    }
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            return "Login Failed";
    }


}
