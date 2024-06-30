import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-book-service-popup',
  templateUrl: './book-service-popup.component.html',
  styleUrls: ['./book-service-popup.component.css']
})
export class BookServicePopupComponent {

  appointmentId: number;


  constructor(
    public dialogRef: MatDialogRef<BookServicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentService
  ) {
    this.appointmentId = data.appointmentId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  bookTimeSlot(): void {
    const buyerId = Number(localStorage.getItem('userId'));

    if (!buyerId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.appointmentService.bookAppointment(this.appointmentId, buyerId).subscribe(response => {
      console.log('Appointment booked successfully:', response);
      this.dialogRef.close(true);
    }, error => {
      console.error('Error booking appointment:', error);
    });
  }
}
