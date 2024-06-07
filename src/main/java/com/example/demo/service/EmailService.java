package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender; // Autowire the JavaMailSender

    public void sendAcceptanceEmail(String volunteerEmail, String volunteerName, String organizationName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dormmarketplace@outlook.com"); // Set your 'From' email address
        message.setTo(volunteerEmail);
        message.setSubject("Congratulations! You've Been Accepted!");
        message.setText("Hello " + volunteerName + ",\n\n" +
                "We're excited to inform you that your application to join " + organizationName + " has been accepted!\n\n" +
                "Welcome to the team!\n\n" +
                "Best regards,\n" +
                organizationName);
        emailSender.send(message);
    }

    public void sendRefusalEmail(String volunteerEmail, String volunteerName, String organizationName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dormmarketplace@outlook.com"); // Set your 'From' email address
        message.setTo(volunteerEmail);
        message.setSubject("Thank you for your application!");
        message.setText("Hello " + volunteerName + ",\n\n" +
                "Unfortunately, we have decided that you won't join " + organizationName + " during this trials.\n\n" +
                "We would like to thank you for your interest!\n\n" +
                "Best regards,\n" +
                organizationName);
        emailSender.send(message);
    }
}

