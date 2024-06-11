import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-services-marketplace',
  templateUrl: './services-marketplace.component.html',
  styleUrls: ['./services-marketplace.component.css']
})
export class ServicesMarketplaceComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.serviceService.getAllServices().subscribe(
      (data: Service[]) => this.services = data,
      error => console.error('Error fetching services', error)
    );
  }
}
