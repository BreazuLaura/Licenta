package com.example.demo.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private String contactInfo;

//    @ElementCollection
//    private List<String> photos;

    // Constructors
    public Product() {}

    public Product(String name, double price, String description, String contactInfo) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        //this.photos = photos;
    }

    // Getters and setters
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

//    public List<String> getPhotos() {
//        return photos;
//    }

//    public void setPhotos(List<String> photos) {
//        this.photos = photos;
//    }
}
