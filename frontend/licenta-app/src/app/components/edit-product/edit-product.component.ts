import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FileService } from "../../services/file.service";
import { MatDialog } from '@angular/material/dialog';
import { SellerService } from '../../services/seller.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product | undefined;
  imageSrc?: SafeUrl; // Now optional to handle initialization
  categories = ['ELECTRONICS', 'FURNITURE', 'FASHION', 'FOOD', 'OTHER'];
  dorms = ['CAMIN_P1', 'CAMIN_P3', 'CAMIN_P5', 'CAMIN_P6', 'CAMIN_19', 'CAMIN_20', 'CAMIN_22'];


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      this.loadImage(productId);
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

  onSubmit() {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe(
        response => {
          console.log('Product updated successfully', response);
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 3000, // Notification will close after 3 seconds
          });
          // Optionally, redirect to another page or display a success message
        },
        error => {
          console.error('Error updating product', error);
          this.snackBar.open('Error updating product', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  onDelete() {
    if (this.product && this.product.id) {
      this.productService.deleteProduct(this.product.id).subscribe(
        response => {
          console.log('Product deleted successfully', response);
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/products']); // Navigate to the products list page
        },
        error => {
          console.error('Error deleting product', error);
          this.snackBar.open('Error deleting product', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

}
