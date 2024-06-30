package com.example.demo.service;

import com.example.demo.model.Auction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender; // Autowire the JavaMailSender

    public void sendAuctionWinnerEmail(Auction auction) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dormmarketplace@outlook.com"); // Set your 'From' email address
        message.setTo(auction.getCurrentHighestBid().getUser().getEmail());
        message.setSubject("Congratulations! You've won the auction!");
        String name = auction.getCurrentHighestBid().getUser().getFirstName() + auction.getCurrentHighestBid().getUser().getLastName();
        message.setText("Hello " + name + ",\n\n" +
                "We're excited to inform you that you won the auction for product " + auction.getProduct().getName() + "!\n\n" +
                "The auction organizer will contact you as soon as possible!\n\n" +
                "Best regards,\n" +
                "Dorm MarketPlace");
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

    public void sendAuctionLosersEmail(Auction auction) {
    }

    public void sendAuctionOrganizerEmail(Auction auction) {
    }
}

