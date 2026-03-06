package com.example.schedula_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
public class DoctorSlotResponseDto {

    private String slotId;

    private String date;
    private String startTime;
    private String endTime;

    private String mode;

    private Integer capacity;
    private Integer bookedCount;
    private Integer availableCount;

    private List<AppointmentSummaryDto> appointments;
}