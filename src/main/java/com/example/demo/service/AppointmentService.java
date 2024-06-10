package com.example.demo.service;

import com.example.demo.dto.AppointmentDTO;
import com.example.demo.exceptionsHandler.ResourceNotFoundException;
import com.example.demo.model.Appointment;
import com.example.demo.model.Users;
import com.example.demo.model.Services;
import com.example.demo.model.enums.AppointmentStatus;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private UserRepository userRepository;


    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Appointment saveAppointment(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setStartTime(appointmentDTO.getStartTime().plusHours(3));
        appointment.setEndTime(appointmentDTO.getEndTime().plusHours(3));
        appointment.setService(appointmentDTO.getService());

        Users owner = userRepository.findById(appointmentDTO.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
        appointment.setOwner(owner);

        appointment.setStatus(AppointmentStatus.AVAILABLE);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentByOwnerId(Long id) {
        return appointmentRepository.findByOwnerId(id);
    }
}
