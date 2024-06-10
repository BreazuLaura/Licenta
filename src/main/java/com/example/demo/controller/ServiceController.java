package com.example.demo.controller;

import com.example.demo.dto.ServiceDTO;
import com.example.demo.model.Services;
import com.example.demo.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:4200")

public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public List<Services> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public Services getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }


    @GetMapping("/user/{userId}")
    public List<Services> getServiceByUserId(@PathVariable Long userId) {
        return serviceService.getServiceByUserId(userId);
    }


    @PostMapping("/{id}")
    public Services createService(@RequestBody ServiceDTO serviceDTO, @PathVariable Long id) {
        return serviceService.createService(serviceDTO, id);
    }

    @PutMapping("/{id}")
    public Services updateService(@PathVariable Long id, @RequestBody Services services) {
        return serviceService.updateService(id, services);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
    }
}
