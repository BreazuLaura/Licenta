// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ServiceService } from '../../../services/service.service';
// import { Service } from '../../../models/service';
//
// @Component({
//   selector: 'app-add-new-service.ts',
//   templateUrl: './add-new-service.component.html',
//   styleUrls: ['./add-new-service.component.css']
// })
// export class AddNewServiceComponent implements OnInit {
//
//   service: Service = new Service(); // Ensure Service is a class
//   categories: string[] = ['Electronics', 'Furniture', 'Fashion', 'Food', 'Other'];
//   dorms: string[] = ['CAMIN_P1', 'CAMIN_P3', 'CAMIN_P5', 'CAMIN_P6', 'CAMIN_P16', 'CAMIN_P20', 'CAMIN_P22'];
//
//   constructor(private serviceService: ServiceService, private router: Router) { }
//
//   ngOnInit(): void {
//   }
//
//   onSubmit(): void {
//     const userId = localStorage.getItem('userId'); // Get the user ID from local storage
//     if (userId) {
//       this.serviceService.createService(this.service, Number(userId)).subscribe(
//         response => {
//           console.log('Service created successfully:', response);
//           this.router.navigate(['/my-services']);
//         },
//         error => {
//           console.error('Error creating service.ts', error);
//         }
//       );
//     } else {
//       console.error('User ID not found in local storage');
//     }
//   }
// }
