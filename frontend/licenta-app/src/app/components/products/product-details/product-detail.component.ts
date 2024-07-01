import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileService} from "../../../services/file.service";
import { SellerService } from '../../../services/seller.service'; // Import the SellerService
import { MatDialog } from '@angular/material/dialog';
import {ContactSellerComponent} from "../../contact-seller/contact-seller.component";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";


@Component({
  selector: 'app-product-detail',
   templateUrl: './product-detail.component.html',
   styleUrls: ['./product-detail.component.css'],
  //template: `<img [src]="imageSrc" *ngIf="imageSrc" alt="Downloaded Image">`

})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  imageSrc?: SafeUrl; // Now optional to handle initialization
  userId: number;
  user: User | undefined;



  constructor(private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer, private fileService: FileService, public dialog: MatDialog, private sellerService: SellerService, private notificationService: NotificationService, private userService: UserService) {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  ngOnInit(): void {
     const productId = Number(this.route.snapshot.paramMap.get('id'));
     this.productService.getProductById(productId).subscribe(product => {
       this.product = product;
       this.loadImage(productId); // Replace 'initial-image.jpg' with your actual file name
     });

    this.userService.getUser(this.userId).subscribe(
      user => this.user = user,
      error => console.error('Error fetching user details', error)
    );
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

  sendBuyRequest(productId: number | undefined): void {
    if (productId) {
      const notification = {
        notificationType: 'BUY_REQUEST',
        elementId: productId,
        text: `Buy request for product ${this.product?.name}`,
        timestamp: new Date().toISOString(),
        sender: {
          id: this.userId,
          firstName: this.user?.firstName,
          lastName: this.user?.lastName,
          email: this.user?.email,
          phoneNumber: this.user?.phoneNumber
        }
      };
      this.notificationService.createNotification(notification).subscribe(
        response => console.log('Buy request sent', response),
        error => console.error('Error sending buy request', error)
      );
    }
  }

}
