import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080';  // Adjust based on your actual backend URL

  constructor(private http: HttpClient) { }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/products/photo/${id}`, { responseType: 'blob' });
  }
}
