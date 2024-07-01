import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent implements OnInit {
  notifications: Notification[] = [];
  imageError: boolean = false;

  constructor(private notificationService: NotificationService, private productService: ProductService) { }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.loadNotifications(userId);
  }

  loadNotifications(userId: number): void {
    this.notificationService.getNotifications(userId).subscribe(
      (data: Notification[]) => this.notifications = data,
      error => console.error('Error loading notifications', error)
    );
  }

  getInitials(name: string | undefined): string {
    // @ts-ignore
    return name.split(' ').map(n => n[0]).join('');
  }

  getNotificationClass(notification: Notification): string {
    switch (notification.notificationType) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      default: return 'text-muted';
    }
  }

  acceptRequest(notification: Notification): void {
    if (notification.elementId) {
      this.productService.updateProductStatus(notification.elementId, 'SOLD', notification.sender?.id).subscribe(
        response => {
          console.log('Product status updated to SOLD', response);
          this.removeNotification(notification.id);
        },
        error => {
          console.error('Error updating product status:', error);
        }
      );
    }
  }

  denyRequest(notification: Notification): void {
    this.removeNotification(notification.id);
  }

  removeNotification(notificationId: number | undefined): void {
    this.notificationService.deleteNotification(notificationId).subscribe(
      response => {
        console.log('Notification removed', response);
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      },
      error => {
        console.error('Error removing notification:', error);
      }
    );
  }
}
