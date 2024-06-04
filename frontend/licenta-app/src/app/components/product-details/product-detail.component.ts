import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileService} from "../../services/file.service";
import { SellerService } from '../../services/seller.service'; // Import the SellerService
import { MatDialog } from '@angular/material/dialog';
import {ContactSellerComponent} from "../contact-seller/contact-seller.component";


@Component({
  selector: 'app-product-detail',
   templateUrl: './product-detail.component.html',
   styleUrls: ['./product-detail.component.css'],
  //template: `<img [src]="imageSrc" *ngIf="imageSrc" alt="Downloaded Image">`

})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  imageSrc?: SafeUrl; // Now optional to handle initialization


  constructor(private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer, private fileService: FileService, public dialog: MatDialog, private sellerService: SellerService) { }

  ngOnInit(): void {
     const productId = Number(this.route.snapshot.paramMap.get('id'));
     this.productService.getProductById(productId).subscribe(product => {
       this.product = product;
       this.loadImage(productId); // Replace 'initial-image.jpg' with your actual file name
     });
  }

  loadImage(id: number) {
    this.productService.downloadFile(id).subscribe(data => {
      const objectURL = URL.createObjectURL(data);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }

  openContactSellerPopup(): void {
    // Open the contact seller popup
    const dialogRef = this.dialog.open(ContactSellerComponent, {
      width: '400px', // Adjust width as needed
      data: { productId: this.product?.id } // Pass the productId to the dialog
    });
  }

}
