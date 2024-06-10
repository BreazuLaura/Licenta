package com.example.demo.model;

import com.example.demo.model.enums.Dorm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Product> products;

    @Enumerated(EnumType.STRING)
    private Dorm dorm;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Services> services;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Appointment> ownedAppointments;

    @OneToMany(mappedBy = "buyer")
    private List<Appointment> boughtAppointments;

    // getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Dorm getDorm() {
        return dorm;
    }

    public void setDorm(Dorm dorm) {
        this.dorm = dorm;
    }

    public List<Services> getServices() {
        return services;
    }

    public void setServices(List<Services> services) {
        this.services = services;
    }

    public List<Appointment> getOwnedAppointments() {
        return ownedAppointments;
    }

    public void setOwnedAppointments(List<Appointment> ownedAppointments) {
        this.ownedAppointments = ownedAppointments;
    }

    public List<Appointment> getBoughtAppointments() {
        return boughtAppointments;
    }

    public void setBoughtAppointments(List<Appointment> boughtAppointments) {
        this.boughtAppointments = boughtAppointments;
    }

    public Users() {
    }

    public Users(String firstName, String lastName, String email, String password, String phoneNumber, List<Product> products) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.products = products;
    }

    public Users(String firstName, String lastName, String email, String password, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    public Users(String firstName, String lastName, String email, String password, String phoneNumber, List<Product> products, Dorm dorm) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.products = products;
        this.dorm = dorm;
    }

    public Users(String firstName, String lastName, String email, String password, String phoneNumber, Dorm dorm) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.dorm = dorm;
    }
}

