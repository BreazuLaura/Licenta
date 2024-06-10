package com.example.demo.dto;

import com.example.demo.model.Services;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Services service;
    private Long ownerId;
    private Long buyerId;

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public AppointmentDTO(LocalDateTime startTime, LocalDateTime endTime, Services service, Long ownerId, Long buyerId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.service = service;
        this.ownerId = ownerId;
        this.buyerId = buyerId;
    }

    public AppointmentDTO() {
    }
}
