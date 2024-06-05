package com.example.demo.model;

import com.example.demo.model.enums.Category;
import com.example.demo.model.enums.Dorm;
import com.example.demo.model.enums.SaleType;
import com.example.demo.model.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @ManyToOne
    @JoinColumn(name = "owner")
    @JsonIgnore
    private Users owner;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Photo> photos;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private Auction auction;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Status status = Status.AVAILABLE;;

    @Enumerated(EnumType.STRING)
    private SaleType saleType = SaleType.MARKETPLACE;

    @Enumerated(EnumType.STRING)
    private Dorm dorm;

    // Constructors
    public Product() {}

    public Product(String name, double price, String description, String contactInfo, Users owner) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        this.owner = owner;
    }

    public Product(String name, double price, String description, String contactInfo, Users owner, Category category, Status status, SaleType saleType, Dorm dorm) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        this.owner = owner;
        this.category = category;
        this.status = status;
        this.saleType = saleType;
        this.dorm = dorm;
    }

    public Product(String name, double price, String description, String contactInfo, Users owner, Category category, SaleType saleType, Dorm dorm) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        this.owner = owner;
        this.category = category;
        this.saleType = saleType;
        this.dorm = dorm;
    }

    public Product(String name, double price, String description, String contactInfo, Users owner, List<Photo> photos, Auction auction, Category category, Status status, SaleType saleType, Dorm dorm) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.contactInfo = contactInfo;
        this.owner = owner;
        this.photos = photos;
        this.auction = auction;
        this.category = category;
        this.status = status;
        this.saleType = saleType;
        this.dorm = dorm;
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

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
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

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }
}

