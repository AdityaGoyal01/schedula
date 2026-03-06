package com.example.schedula_backend.controller;

import com.example.schedula_backend.model.Appointment;
import com.example.schedula_backend.model.Slot;
import com.example.schedula_backend.model.SlotMode;

import com.example.schedula_backend.dto.AppointmentRequest;
import com.example.schedula_backend.repository.AppointmentRepository;
import com.example.schedula_backend.repository.SlotRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private SlotRepository slotRepository;

    // --- Book Appointment ---
    @PostMapping("/book")
public Appointment bookAppointment(@RequestBody AppointmentRequest request) {

    Slot slot = slotRepository.findById(request.getSlotId())
            .orElseThrow(() -> new RuntimeException("Slot not found"));

    // simple capacity check
    if (slot.getMode() == SlotMode.STREAM && slot.getBookedCount() >= 1) {
        throw new RuntimeException("Slot is already booked (stream mode)");
    }
    if (slot.getMode() == SlotMode.WAVE && slot.getBookedCount() >= slot.getCapacity()) {
        throw new RuntimeException("Slot is full (wave mode)");
    }

    // increment booked count
    slot.setBookedCount(slot.getBookedCount() + 1);
    slotRepository.save(slot);

    // create appointment
    Appointment appt = Appointment.builder()
            .doctorId(request.getDoctorId())
            .patientId(request.getPatientId())  // direct from request
            .slotId(slot.getId())
            .reason(request.getReason())
            .date(slot.getDate())
            .startTime(slot.getStartTime())
            .endTime(slot.getEndTime())
            .build();

    return appointmentRepository.save(appt);
}

    // --- Get All Appointments for Patient ---
    // --- Get All Appointments for Patient ---
@GetMapping("/me")
public List<Appointment> getMyAppointments(@RequestParam String patientId) {
    return appointmentRepository.findByPatientId(patientId);
}

// --- Delete Appointment ---
@DeleteMapping("/{id}")
public String cancelAppointment(@PathVariable String id,
                                @RequestParam String patientId) {

    Appointment appt = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

    if (!appt.getPatientId().equals(patientId)) {
        throw new RuntimeException("You can only cancel your own appointments");
    }

    // reduce booked count
    Slot slot = slotRepository.findById(appt.getSlotId())
            .orElseThrow(() -> new RuntimeException("Slot not found"));

    slot.setBookedCount(slot.getBookedCount() - 1);
    slotRepository.save(slot);

    appointmentRepository.deleteById(id);
    return "Appointment canceled successfully";
}
// --- Get All Appointments for Logged-in Doctor ---
@GetMapping("/doctor/me")
public List<Appointment> getMyDoctorAppointments(
        @AuthenticationPrincipal UserDetails user,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

    if (user == null) {
        throw new RuntimeException("User not authenticated");
    }

    String doctorId = user.getUsername(); // token se doctorId

    if (date != null) {
        // date filter ke saath
        return appointmentRepository.findByDoctorIdAndDate(doctorId, date);
    }

    // agar date nahi di → saare appointments
    return appointmentRepository.findByDoctorId(doctorId);
}
}