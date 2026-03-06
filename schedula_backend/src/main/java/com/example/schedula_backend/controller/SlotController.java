package com.example.schedula_backend.controller;

import com.example.schedula_backend.dto.CreateSlotRequest;
import com.example.schedula_backend.dto.DoctorSlotResponseDto;
import com.example.schedula_backend.model.Slot;
import com.example.schedula_backend.service.SlotService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class SlotController {

    private final SlotService slotService;

    // CREATE SLOTS (Auto Split)
    @PostMapping("/{doctorId}/slots")
    public List<Slot> createSlots(
            @PathVariable String doctorId,
            @RequestBody CreateSlotRequest request) {

        return slotService.createSlots(doctorId, request);
    }

    // GET TODAY SLOTS
    @GetMapping("/{doctorId}/slots")
    public List<Slot> getTodaySlots(@PathVariable String doctorId) {
        return slotService.getTodaySlots(doctorId);
    }

    // DELETE SLOT
    @DeleteMapping("/{doctorId}/slots/{slotId}")
    public String deleteSlot(@PathVariable String slotId) {
        slotService.deleteSlot(slotId);
        return "Slot deleted successfully";
    }

    @GetMapping("/{doctorId}/details")
public ResponseEntity<List<DoctorSlotResponseDto>> getDoctorSlots(
        @PathVariable String doctorId) {
    System.out.println("DETAILS API HIT 🔥🔥🔥");

    return ResponseEntity.ok(
            slotService.getDoctorSlotDetails(doctorId)
    );
}
}