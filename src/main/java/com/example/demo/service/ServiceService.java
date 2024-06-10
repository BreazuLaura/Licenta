package com.example.demo.service;

import com.example.demo.dto.ServiceDTO;
import com.example.demo.model.Service;
import com.example.demo.model.Users;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Service createService(ServiceDTO serviceDTO, Long userId) {
        Service service = new Service();
        service.setDescription(serviceDTO.getDescription());
        service.setCategory(serviceDTO.getCategory());
        service.setDorm(serviceDTO.getDorm());
        service.setName(serviceDTO.getName());
        service.setPrice(serviceDTO.getPrice());
        service.setOwner(userRepository.findById(userId).orElse(null));
        service.setDuration(serviceDTO.getDuration());
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service service) {
        service.setId(id);
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    public List<Service> getServiceByUserId(Long userId) {
        return serviceRepository.findByOwnerId(userId);
    }
}
