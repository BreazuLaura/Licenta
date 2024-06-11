import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-services-marketplace',
  templateUrl: './services-marketplace.component.html',
  styleUrls: ['./services-marketplace.component.css']
})
export class ServicesMarketplaceComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.serviceService.getAllServices().subscribe(
      (data: Service[]) => this.services = data,
      error => console.error('Error fetching services', error)
    );
  }

  bookService(serviceId: number | undefined): void {
    this.router.navigate(['/book-service', serviceId]);
  }
}
