package com.example.demo.model;

import com.example.demo.model.enums.AppointmentStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "services_id", nullable = false)
    private Services services;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Users owner;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Users buyer;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.AVAILABLE;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
        return services;
    }

    public void setService(Services services) {
        this.services = services;
    }

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public Users getBuyer() {
        return buyer;
    }

    public void setBuyer(Users buyer) {
        this.buyer = buyer;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public Appointment(LocalDateTime startTime, LocalDateTime endTime, Services services, Users owner, Users buyer, AppointmentStatus status) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.services = services;
        this.owner = owner;
        this.buyer = buyer;
        this.status = status;
    }

    public Appointment() {
    }
}
