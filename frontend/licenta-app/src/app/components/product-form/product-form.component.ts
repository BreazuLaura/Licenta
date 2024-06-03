import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = {
    name: '',
    price: 0,
    description: '',
    contactInfo: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log('Submitting product:', this.product);
      this.http.post(`http://localhost:8080/products/${userId}`, this.product)
        .subscribe(
          response => {
            console.log('Product created successfully', response);
            this.router.navigate(['/view-marketplace']);
          },
          error => {
            console.error('Error creating product', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }
}
