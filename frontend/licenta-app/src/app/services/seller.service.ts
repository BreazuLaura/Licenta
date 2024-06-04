// seller.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Import the Users model

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getSeller(productId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-seller/${productId}`);
  }
}
