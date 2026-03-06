package com.example.schedula_backend.controller;

import com.example.schedula_backend.model.Role;
import com.example.schedula_backend.model.User;
import com.example.schedula_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")   
@RequiredArgsConstructor
public class DoctorController {

    private final UserRepository userRepository;

    // GET ALL DOCTORS
    @GetMapping
    public List<User> getAllDoctors() {
        return userRepository.findByRole(Role.DOCTOR);
    }

    // GET DOCTOR BY ID
    @GetMapping("/{id}")
    public User getDoctorById(@PathVariable String id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.DOCTOR)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    
}