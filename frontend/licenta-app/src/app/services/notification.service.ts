import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`);
  }

  createNotification(notification: {
    elementId: number;
    sender: { firstName: any; lastName: any; phoneNumber: any; id: number; email: any };
    notificationType: string;
    text: string;
    timestamp: string
  }): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  deleteNotification(notificationId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
  }
}
