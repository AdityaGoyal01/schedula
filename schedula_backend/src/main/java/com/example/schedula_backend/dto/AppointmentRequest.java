package com.example.schedula_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequest {
    private String doctorId;
    private String patientId;
    private String slotId;
    private String reason;
}