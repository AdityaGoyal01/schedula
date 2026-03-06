package com.example.schedula_backend.repository;

import com.example.schedula_backend.model.Slot;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface SlotRepository extends MongoRepository<Slot, String> {

    List<Slot> findByDoctorIdAndDate(String doctorId, LocalDate date);
}