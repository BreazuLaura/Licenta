package com.example.demo.model;

import com.example.demo.model.enums.NotificationType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private NotificationType notificationType;

    private Long elementId;
    private String text;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private Users user;
}
