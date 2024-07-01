import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getFilteredProducts(searchQuery: string, filterCategory: string, filterDorm: string, filterStatus: string, sortOrder: string, orderBy: string): Observable<Product[]> {
    let params = new HttpParams();
    if (searchQuery) params = params.append('searchQuery', searchQuery);
    if (filterCategory) params = params.append('filterCategory', filterCategory);
    if (filterDorm) params = params.append('filterDorm', filterDorm);
    if (filterStatus) params = params.append('filterStatus', filterStatus);
    params = params.append('sortOrder', sortOrder);
    params = params.append('orderBy', orderBy);

    return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }



  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadFile(id: any): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/photo/${id}`, { responseType: 'blob' });
  }

  updateProductStatus(productId: number, status: string, senderId: number | undefined): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}/status/${status}/${senderId}`, {});
  }
}
