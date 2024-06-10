package com.example.demo.dto;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long serviceId;
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

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
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

    public AppointmentDTO(LocalDateTime startTime, LocalDateTime endTime, Long serviceId, Long ownerId, Long buyerId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.serviceId = serviceId;
        this.ownerId = ownerId;
        this.buyerId = buyerId;
    }

    public AppointmentDTO() {
    }
}
