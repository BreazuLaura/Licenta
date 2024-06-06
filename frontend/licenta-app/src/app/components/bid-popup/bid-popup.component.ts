import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-bid-popup',
  templateUrl: './bid-popup.component.html',
  styleUrls: ['./bid-popup.component.css']
})
export class BidPopupComponent {
  bidAmount: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<BidPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveBid(): void {
    this.dialogRef.close(this.bidAmount);
  }
}
