package com.example.schedula_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Slot {

    @Id
    private String id;

    private String doctorId;

    private LocalDate date;

    private LocalTime startTime;
    private LocalTime endTime;

    private SlotMode mode;

    private Integer capacity;
    private Integer bookedCount;
}