package com.example.demo.dto;

import com.example.demo.model.enums.Category;
import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.SaleType;
import com.example.demo.model.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

public class AuctionDTO {
    private String name;
    private double price;
    private String description;
    private String contactInfo;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private SaleType saleType;

    @Enumerated(EnumType.STRING)
    private Dorm dorm;

    private BigDecimal startPrice;

    private LocalDateTime endDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public SaleType getSaleType() {
        return saleType;
    }

    public void setSaleType(SaleType saleType) {
        this.saleType = saleType;
    }

    public Dorm getDorm() {
        return dorm;
    }

    public void setDorm(Dorm dorm) {
        this.dorm = dorm;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public AuctionDTO(String name, double price, String description, String contactInfo, Category category, Status status, SaleType saleType, Dorm dorm, BigDecimal startPrice, LocalDateTime endDate) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        this.category = category;
        this.status = status;
        this.saleType = saleType;
        this.dorm = dorm;
        this.startPrice = startPrice;
        this.endDate = endDate;
    }

    public AuctionDTO() {
    }
}
