package com.example.demo.controller;

import com.example.demo.dto.AppointmentDTO;
import com.example.demo.model.Appointment;
import com.example.demo.model.Services;
import com.example.demo.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointment) {
        Appointment savedAppointment = appointmentService.saveAppointment(appointment);
        return ResponseEntity.ok(savedAppointment);
    }


    @PutMapping("/book/appointmentId/buyerId")
    public ResponseEntity<Appointment> bookAppointment(@PathVariable Long appointmentId, @PathVariable Long buyerId) throws ValidationException {
        Appointment bookedAppointment = appointmentService.bookAppointment(appointmentId, buyerId);
        return ResponseEntity.ok(bookedAppointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentByOwnerId(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentByOwnerId(id));
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByServiceId(@PathVariable Long serviceId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByServiceId(serviceId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}

