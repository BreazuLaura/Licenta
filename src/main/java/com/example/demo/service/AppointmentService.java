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

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Appointment> getAppointmentsByServiceId(Long serviceId) {
        return appointmentRepository.findByServicesId(serviceId);
    }

    public Appointment bookAppointment(Long appointmentId, Long buyerId) throws ValidationException {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if (appointment.isEmpty())
            throw new ValidationException("Appointment not found");

        if (appointment.get().getStatus() != AppointmentStatus.AVAILABLE) {
            throw new ValidationException("Appointment is not available for booking");
        }

        appointment.get().setStatus(AppointmentStatus.RESERVED);
        appointment.get().setBuyer(userRepository.findById(buyerId).get());

        return appointmentRepository.save(appointment.get());
    }

    public List<Appointment> getAppointmentByUserId(Long id) {
        List<Appointment> appointments = appointmentRepository.findByOwnerId(id);
        appointments.stream().filter(a -> (a.getStatus().equals(AppointmentStatus.RESERVED))).collect(Collectors.toList());
        List<Appointment> userAppointments = appointmentRepository.findByBuyerId(id);
        appointments.addAll(userAppointments);

        return appointments;
    }
}
