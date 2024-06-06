import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auction } from '../../../models/auction'; // Adjust the path as necessary
import { MatSnackBar } from '@angular/material/snack-bar'; // Add this import for notifications

@Component({
  selector: 'app-bid-popup',
  templateUrl: './bid-popup.component.html',
  styleUrls: ['./bid-popup.component.css']
})
export class BidPopupComponent {
  bidAmount?: number;

  constructor(
    public dialogRef: MatDialogRef<BidPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { auction: Auction },
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveBid(): void {
    if (this.bidAmount !== undefined) {
      const currentHighestBid = this.data.auction.currentHighestBid ? this.data.auction.currentHighestBid.amount : 0;
      // @ts-ignore
      if (this.bidAmount > currentHighestBid) {
        this.dialogRef.close(this.bidAmount);
      } else {
        this.snackBar.open(`The amount of bid must be greater than ${currentHighestBid}`, 'Close', {
           duration: 5000
        });
      }
    }
  }
}
