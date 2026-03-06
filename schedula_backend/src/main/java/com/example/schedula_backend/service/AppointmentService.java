package com.example.schedula_backend.service;

import com.example.schedula_backend.model.Appointment;
import com.example.schedula_backend.model.Slot;
import com.example.schedula_backend.model.SlotMode;
import com.example.schedula_backend.repository.AppointmentRepository;
import com.example.schedula_backend.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private SlotRepository slotRepository;

    // --- Book Appointment ---
    public Appointment bookAppointment(String patientId, String doctorId, String slotId, String reason) {

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        // capacity check
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
                .doctorId(doctorId)
                .patientId(patientId)
                .slotId(slot.getId())
                .reason(reason)
                .date(slot.getDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .build();

        return appointmentRepository.save(appt);
    }

    // --- Get appointments for patient ---
    public List<Appointment> getAppointmentsForPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // --- Cancel Appointment ---
    public String cancelAppointment(String appointmentId, String patientId) {

        Appointment appt = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appt.getPatientId().equals(patientId)) {
            throw new RuntimeException("You can only cancel your own appointments");
        }

        // reduce booked count
        Slot slot = slotRepository.findById(appt.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setBookedCount(slot.getBookedCount() - 1);
        slotRepository.save(slot);

        appointmentRepository.deleteById(appointmentId);
        return "Appointment canceled successfully";
    }
}