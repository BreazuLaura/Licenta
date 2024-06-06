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
    return this.http.get<Auction[]>(`${this.apiUrl}/my-auctions/${userId}`);
  }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.apiUrl}/${id}`);
  }

  updateAuction(id: number | undefined, auction: Auction): Observable<Auction> {
    return this.http.put<Auction>(`${this.apiUrl}/${id}`, auction);
  }

  deleteAuction(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllAuctions() {

  }
}
