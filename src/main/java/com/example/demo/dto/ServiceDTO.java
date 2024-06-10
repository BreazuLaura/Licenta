package com.example.demo.dto;

import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.ServiceCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;

public class ServiceDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Float duration;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;


    @Enumerated(EnumType.STRING)
    private Dorm dorm;

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

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
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

    public ServiceDTO() {
    }

    public ServiceDTO(String name, String description, BigDecimal price, Float duration, ServiceCategory category, Dorm dorm) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.category = category;
        this.dorm = dorm;
    }
}
