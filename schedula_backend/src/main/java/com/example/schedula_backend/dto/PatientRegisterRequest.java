package com.example.schedula_backend.dto;

import lombok.Data;

@Data
public class PatientRegisterRequest {

    private String name;
    private String email;
    private String password;
    private Integer age;
    private String gender;
}