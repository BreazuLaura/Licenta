import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SellerService } from '../../services/seller.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.css']
})
export class ContactSellerComponent implements OnInit {

  seller: User = { id: 0, firstName: '', lastName: '', email: '', password:'', phoneNumber:'' }; // Initialize with default values
  productId: number; // Add productId property

  constructor(
    public dialogRef: MatDialogRef<ContactSellerComponent>,
    private sellerService: SellerService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to get data passed from parent component
  ) {
    // Retrieve productId from data if passed
    this.productId = this.data.productId;
  }

  ngOnInit(): void {
    // Fetch seller information when the component initializes
    this.getSellerInfo();
  }

  // Method to fetch seller information
  getSellerInfo(): void {
    if (!this.productId) {
      console.error('ProductId not provided.');
      return;
    }
    this.sellerService.getSeller(this.productId).subscribe(
      (data: User) => {
        this.seller = data;
      },
      (error) => {
        console.error('Error fetching seller information:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
