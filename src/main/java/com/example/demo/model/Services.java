package com.example.demo.model;

import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.ServiceCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Float duration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceCategory category;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Dorm dorm;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private Users owner;

    @OneToMany(mappedBy = "services")
    @JsonIgnore
    private List<Appointment> appointments;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }


    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }


    public Dorm getDorm() {
        return dorm;
    }

    public void setDorm(Dorm dorm) {
        this.dorm = dorm;
    }

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public Services(Long id, String name, String description, BigDecimal price, ServiceCategory category, Dorm dorm, Users owner) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.dorm = dorm;
        this.owner = owner;
    }

    public Services(String name, String description, BigDecimal price, ServiceCategory category, Dorm dorm, Users owner) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.dorm = dorm;
        this.owner = owner;
    }

    public Services() {
    }
}

