import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = {
    name: '',
    price: null,
    description: '',
    contactInfo: ''
  };
  selectedFile: File | null = null;


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(this.product)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    this.http.post(`http://localhost:8080/products/${userId}`, formData)
      .subscribe(response => {
        console.log('Product created successfully', response);
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000, // Notification will close after 3 seconds
        });
        this.router.navigate(['/my-products']);
      }, error => {
        console.error('Error creating product', error);
      });
  }
}
