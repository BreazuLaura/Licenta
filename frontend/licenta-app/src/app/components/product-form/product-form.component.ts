import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    contactInfo: '',
    photos: []
  };

  constructor(private productService: ProductService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.productService.addProduct(this.product).subscribe(response => {
        console.log('Product added successfully');
        // Reset the form after successful submission
        form.reset();
      }, error => {
        console.error('Error adding product', error);
      });
    }
  }
}
