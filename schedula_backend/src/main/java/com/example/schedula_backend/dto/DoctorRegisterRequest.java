package com.example.schedula_backend.dto;

import lombok.Data;

@Data
public class DoctorRegisterRequest {

    private String name;
    private String email;
    private String password;
    private String specialization;
}