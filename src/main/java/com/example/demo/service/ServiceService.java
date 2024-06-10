package com.example.demo.service;

import com.example.demo.dto.ServiceDTO;
import com.example.demo.model.Services;
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

    public List<Services> getAllServices() {
        return serviceRepository.findAll();
    }

    public Services getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Services createService(ServiceDTO serviceDTO, Long userId) {
        Services services = new Services();
        services.setDescription(serviceDTO.getDescription());
        services.setCategory(serviceDTO.getCategory());
        services.setDorm(serviceDTO.getDorm());
        services.setName(serviceDTO.getName());
        services.setPrice(serviceDTO.getPrice());
        services.setOwner(userRepository.findById(userId).orElse(null));
        services.setDuration(serviceDTO.getDuration());
        return serviceRepository.save(services);
    }

    public Services updateService(Long id, Services services) {
        services.setId(id);
        return serviceRepository.save(services);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    public List<Services> getServiceByUserId(Long userId) {
        return serviceRepository.findByOwnerId(userId);
    }
}
