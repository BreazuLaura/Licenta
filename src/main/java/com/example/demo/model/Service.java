package com.example.demo.model;

import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.ServiceCategory;
import com.example.demo.model.enums.ServiceStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Service {

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
    private ServiceStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Dorm dorm;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Users owner;

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

    public ServiceStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceStatus status) {
        this.status = status;
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

    public Service(Long id, String name, String description, BigDecimal price, ServiceCategory category, ServiceStatus status, Dorm dorm, Users owner) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.status = status;
        this.dorm = dorm;
        this.owner = owner;
    }

    public Service(String name, String description, BigDecimal price, ServiceCategory category, ServiceStatus status, Dorm dorm, Users owner) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.status = status;
        this.dorm = dorm;
        this.owner = owner;
    }

    public Service() {
    }
}

