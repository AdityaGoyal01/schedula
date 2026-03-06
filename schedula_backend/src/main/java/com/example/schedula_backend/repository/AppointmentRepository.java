package com.example.schedula_backend.repository;

import com.example.schedula_backend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByDoctorId(String doctorId);
List<Appointment> findByDoctorIdAndDate(String doctorId, LocalDate date);
List<Appointment> findBySlotId(String slotId);
}