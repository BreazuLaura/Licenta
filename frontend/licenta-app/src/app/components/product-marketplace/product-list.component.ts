import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.products.forEach(product => {
        this.productService.downloadFile(product.id).subscribe((blob: Blob) => {
          let objectURL = URL.createObjectURL(blob);
          product.imageSrc = objectURL;
        });
      });
    });
  }
}
