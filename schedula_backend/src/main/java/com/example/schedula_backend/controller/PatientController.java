package com.example.schedula_backend.controller;

import com.example.schedula_backend.model.Role;
import com.example.schedula_backend.model.User;
import com.example.schedula_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PatientController {

    private final UserRepository userRepository;

    // GET PATIENT BY ID
    @GetMapping("/patient/{id}")
    public User getPatientById(@PathVariable String id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.PATIENT)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}