import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private apiUrl = 'http://localhost:8080/bids'; // Adjust the URL according to your backend setup

  constructor(private http: HttpClient) { }

  placeBid(bid: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bid);
  }
}
