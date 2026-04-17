package com.example.schedula_backend.controller;

import com.example.schedula_backend.dto.*;
import com.example.schedula_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/doctor")
    public String registerDoctor(@RequestBody DoctorRegisterRequest request) {
        return authService.registerDoctor(request);
    }

    @PostMapping("/register/patient")
    public String registerPatient(@RequestBody PatientRegisterRequest request) {
        return authService.registerPatient(request);
    }

   @PostMapping("/login")
public Map<String, Object> login(@RequestBody LoginRequest request) {
    return authService.login(request);
}
}