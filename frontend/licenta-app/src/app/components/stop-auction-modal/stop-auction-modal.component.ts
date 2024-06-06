import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-auction-modal',
  templateUrl: './stop-auction-modal.component.html'
})
export class StopAuctionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StopAuctionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
