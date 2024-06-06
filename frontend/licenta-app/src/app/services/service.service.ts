import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = 'http://localhost:8080/services';

  constructor(private http: HttpClient) { }

  getServicesByUserId(userId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/user/${userId}`);
  }

  createService(service: Service, userId: number): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/${userId}`, service);
  }
}
