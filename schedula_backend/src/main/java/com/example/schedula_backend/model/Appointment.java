package com.example.schedula_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    private String id;

    private String doctorId;
    private String patientId;

    private String reason;

    private String slotId;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}