package com.example.demo.service;

import com.example.demo.model.Service;
import com.example.demo.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service service) {
        service.setId(id);
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
