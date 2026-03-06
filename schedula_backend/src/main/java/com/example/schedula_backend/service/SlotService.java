package com.example.schedula_backend.service;

import com.example.schedula_backend.dto.AppointmentSummaryDto;
import com.example.schedula_backend.dto.CreateSlotRequest;
import com.example.schedula_backend.dto.DoctorSlotResponseDto;
import com.example.schedula_backend.model.Appointment;
import com.example.schedula_backend.model.Slot;
import com.example.schedula_backend.model.SlotMode;
import com.example.schedula_backend.repository.SlotRepository;
import com.example.schedula_backend.repository.AppointmentRepository;
import com.example.schedula_backend.repository.UserRepository;
import com.example.schedula_backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotService {

    private final SlotRepository slotRepository;
    private final AppointmentRepository AppointmentRepository;
    private final UserRepository userRepository;

    public List<Slot> createSlots(String doctorId, CreateSlotRequest request) {

        LocalTime start = LocalTime.parse(request.getStartTime());
        LocalTime end = LocalTime.parse(request.getEndTime());

        if (start.isAfter(end) || start.equals(end)) {
            throw new RuntimeException("Invalid time range");
        }

        if (request.getSlotDuration() <= 0) {
            throw new RuntimeException("Slot duration must be greater than 0");
        }

        LocalDate today = LocalDate.now();

        // 🔥 CHECK OVERLAP FIRST
        List<Slot> existingSlots = slotRepository.findByDoctorIdAndDate(doctorId, today);

        for (Slot existing : existingSlots) {

            boolean isOverlap = existing.getStartTime().isBefore(end) &&
                    existing.getEndTime().isAfter(start);

            if (isOverlap) {
                throw new RuntimeException(
                        "Slot overlaps with existing slot: "
                                + existing.getStartTime() + " - "
                                + existing.getEndTime());
            }
        }

        List<Slot> createdSlots = new ArrayList<>();
        LocalTime current = start;

        while (current.plusMinutes(request.getSlotDuration()).compareTo(end) <= 0) {

            LocalTime slotEnd = current.plusMinutes(request.getSlotDuration());

            Integer capacity;

            if (request.getMode() == SlotMode.STREAM) {
                capacity = 1;
            } else {
                capacity = request.getCapacity();
                if (capacity == null || capacity <= 0) {
                    throw new RuntimeException("Capacity required for WAVE mode");
                }
            }

            Slot slot = Slot.builder()
                    .doctorId(doctorId)
                    .date(today)
                    .startTime(current)
                    .endTime(slotEnd)
                    .mode(request.getMode())
                    .capacity(capacity)
                    .bookedCount(0)
                    .build();

            createdSlots.add(slot);
            current = slotEnd;
        }

        return slotRepository.saveAll(createdSlots);
    }

    public List<Slot> getTodaySlots(String doctorId) {
        return slotRepository.findByDoctorIdAndDate(doctorId, LocalDate.now());
    }

    public void deleteSlot(String slotId) {
        slotRepository.deleteById(slotId);
    }

    public List<DoctorSlotResponseDto> getDoctorSlotDetails(String doctorId) {

        List<Slot> slots = slotRepository.findByDoctorIdAndDate(doctorId, LocalDate.now());

        List<DoctorSlotResponseDto> responseList = new ArrayList<>();

        for (Slot slot : slots) {

            List<Appointment> appointments = AppointmentRepository.findBySlotId(slot.getId());

            int bookedCount = appointments.size();

            int capacity = slot.getCapacity() != null ? slot.getCapacity() : 1;

            int available = capacity - bookedCount;

            List<AppointmentSummaryDto> appointmentDtos = new ArrayList<>();

            for (Appointment appointment : appointments) {

                User patient = userRepository.findById(appointment.getPatientId())
                        .orElse(null);

                if (patient != null) {
                    appointmentDtos.add(
                            new AppointmentSummaryDto(
                                    appointment.getId(),
                                    patient.getName(),
                                    patient.getEmail()));
                }
            }

            responseList.add(
                    new DoctorSlotResponseDto(
                            slot.getId(),
                            slot.getDate().toString(),
                            slot.getStartTime().toString(),
                            slot.getEndTime().toString(),
                            slot.getMode().name(),
                            capacity,
                            bookedCount,
                            available,
                            appointmentDtos));
        }

        return responseList;
    }
}
