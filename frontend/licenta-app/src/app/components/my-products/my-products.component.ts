import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const userId = localStorage.getItem('userId'); // Get the user ID from local storage
    if (userId) {
      this.http.get<any[]>(`http://localhost:8080/products/user/${userId}`)
        .subscribe(
          data => {
            this.products = data;
            this.products.forEach(product => {
              this.productService.downloadFile(product.id).subscribe((blob: Blob) => {
                let objectURL = URL.createObjectURL(blob);
                product.imageSrc = objectURL;
              });
            });
          },
          error => {
            console.error('Error fetching user products', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  addNewProduct(): void {
    this.router.navigate(['/product-form']);
  }
}
