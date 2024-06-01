package com.example.demo.dto;

public class ProductDTO {

    private String name;
    private double price;
    private String description;
    private String contactInfo;

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

    public ProductDTO(String name, double price, String description, String contactInfo) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
    }

    public ProductDTO() {
    }
}

