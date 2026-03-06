package com.example.schedula_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class AppointmentSummaryDto {

    private String appointmentId;
    private String patientName;
    private String patientEmail;
}