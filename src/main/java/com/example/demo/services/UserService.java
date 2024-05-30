package com.example.demo.services;

import com.example.demo.dto.UserDTO;
import com.example.demo.exceptionsHandler.ResourceNotFoundException;
import com.example.demo.models.Users;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users saveUser(UserDTO userDTO) {
        Users user = new Users(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber());
        return userRepository.save(user);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public Users getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteUser(Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    public Users updateUser(Long id, Users userDetails) {
        Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setPhoneNumber(userDetails.getPhoneNumber());

        return userRepository.save(user);
    }
}

