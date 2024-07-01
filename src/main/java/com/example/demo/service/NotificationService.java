package com.example.demo.service;

import com.example.demo.model.Notification;
import com.example.demo.model.Product;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByReceiverId(userId);
    }

    public Notification saveNotification(Notification notification) {
        Optional<Product> product = productRepository.findById(notification.getElementId());
        notification.setReceiver(product.get().getOwner());
//        notification.setSender(userRepository.findById(notification.getSender().getId()).orElse(null));
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
