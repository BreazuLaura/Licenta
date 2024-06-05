import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Auction} from "../models/auction";

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:8080/auctions';

  constructor(private http: HttpClient) { }

  createAuction(formData: FormData, userId: number): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, formData, { observe: 'events' });
  }

  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.apiUrl);
  }

  getUserAuctions(userId: number): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.apiUrl}/${userId}`);
  }

}
