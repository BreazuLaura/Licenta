package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.exceptionsHandler.ResourceNotFoundException;
import com.example.demo.model.Users;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users saveUser(UserDTO userDTO) {
        Users users = new Users(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getPhoneNumber(), userDTO.getDorm());
        return userRepository.save(users);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }


    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteUser(Long id) {
        Users users = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(users);
    }

    public Users updateUser(Long id, Users usersDetails) {
        Users users = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        users.setFirstName(usersDetails.getFirstName());
        users.setLastName(usersDetails.getLastName());
        users.setEmail(usersDetails.getEmail());
        users.setPassword(usersDetails.getPassword());
        users.setPhoneNumber(usersDetails.getPhoneNumber());
        users.setDorm(usersDetails.getDorm());

        return userRepository.save(users);
    }

    public Users loginUser(UserDTO userDTO) {
        Users users = userRepository.findByEmail(userDTO.getEmail()).orElse(null);
        if (users != null && userDTO.getPassword().equals(users.getPassword())) {
            return users;
        }
        throw new RuntimeException("Invalid credentials");
    }
}

