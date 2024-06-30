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
  products: any[] = [];
  searchQuery: string = '';
  filterCategory: string = '';
  filterDorm: string = '';
  filterStatus: string = '';
  sortOrder: string = 'asc';
  orderBy: string = 'name';

  categories: string[] = ['ELECTRONICS', 'FURNITURE', 'FASHION', 'FOOD'];
  dorms: string[] = ['CAMIN_P1', 'CAMIN_P3', 'CAMIN_P5', 'CAMIN_P6', 'CAMIN_P16', 'CAMIN_P20', 'CAMIN_P22'];
  statuses: string[] = ['AVAILABLE', 'SOLD'];

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

  getFilteredProducts(): void {
  }


  onSearch(): void {
    this.getFilteredProducts();
  }

  onSortOrderChange(): void {
    this.getFilteredProducts();
  }

  onOrderByChange(): void {
    this.getFilteredProducts();
  }

  onFilterChange(): void {
    this.getFilteredProducts();
  }
}
