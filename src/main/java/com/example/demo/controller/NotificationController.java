package com.example.demo.controller;

import com.example.demo.model.Notification;
import com.example.demo.model.enums.NotificationType;
import com.example.demo.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable Long userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        System.out.println(notification.toString());
        System.out.println(notification.getNotificationType());
        if(notification.getNotificationType().equals("BUY_REQUEST")) {
            notification.setNotificationType(NotificationType.BUY_REQUEST);
        }
        return notificationService.saveNotification(notification);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
