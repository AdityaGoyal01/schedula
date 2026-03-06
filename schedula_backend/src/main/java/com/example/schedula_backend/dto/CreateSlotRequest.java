package com.example.schedula_backend.dto;

import com.example.schedula_backend.model.SlotMode;
import lombok.Data;

@Data
public class CreateSlotRequest {

    private String startTime;   // "10:00"
    private String endTime;     // "12:00"
    private SlotMode mode;      // STREAM / WAVE
    private Integer slotDuration; // in minutes
    private Integer capacity;   // only used in WAVE
}