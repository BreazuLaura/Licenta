import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appointment} from "../models/appointment";

// export interface Appointment {
//   startTime: string;
//   endTime: string;
//   serviceId: number;
//   ownerId: number;
//   buyerId: number;
// }

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) { }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getAppointmentsByOwnerId(ownerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

  getAppointmentsByService(serviceId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/service/${serviceId}`);
  }

  bookAppointment(appointmentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, { appointmentId });
  }
}
