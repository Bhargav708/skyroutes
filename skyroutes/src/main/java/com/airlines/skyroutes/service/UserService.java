package com.airlines.skyroutes.service;

import com.airlines.skyroutes.model.User;
import com.airlines.skyroutes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public User addUser(User user) {

     return repository.save(user);
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public String deleteUSer(long id) {
        repository.deleteById(id);
        return "User with id:"+ id+" is successfully deleted";
    }
}
