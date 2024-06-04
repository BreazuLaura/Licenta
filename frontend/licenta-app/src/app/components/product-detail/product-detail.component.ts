import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  productPhoto: string | undefined;
  photoUrl: SafeUrl | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      this.loadPhoto(productId);
    });
  }

  loadPhoto(productId: number): void {
    this.productService.getProductPhoto(productId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    }, error => {
      console.error('Failed to load photo:', error);
    });
  }

  getProductPhotoUrl(productId: number): string {
    return this.productPhoto!;
  }
}
