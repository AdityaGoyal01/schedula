package com.example.schedula_backend.service;

import com.example.schedula_backend.dto.*;
import com.example.schedula_backend.model.Role;
import com.example.schedula_backend.model.User;
import com.example.schedula_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import java.util.HashMap;
import java.util.Map;
import java.util.HashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // =============================
    // REGISTER DOCTOR
    // =============================

    public String registerDoctor(DoctorRegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User doctor = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.DOCTOR)
                .specialization(request.getSpecialization())
                .build();

        userRepository.save(doctor);

        return "Doctor registered successfully";
    }

    // =============================
    // REGISTER PATIENT
    // =============================

    public String registerPatient(PatientRegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User patient = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.PATIENT)
                .age(request.getAge())
                .gender(request.getGender())
                .build();

        userRepository.save(patient);

        return "Patient registered successfully";
    }

    // =============================
    // LOGIN (TOKEN RETURN)
    // =============================

    public Map<String, Object>  login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

         String token = jwtService.generateToken(user);

    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("role", user.getRole()); 
    response.put("id", user.getId());

    return response;
}
    }
