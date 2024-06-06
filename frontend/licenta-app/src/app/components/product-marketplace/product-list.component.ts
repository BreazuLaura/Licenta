import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.products.forEach(product => {
        this.productService.downloadFile(product.id).subscribe((blob: Blob) => {
          let objectURL = URL.createObjectURL(blob);
          product.imageSrc = objectURL;
        });
      });
    });
  }

  getFilteredProducts(): void {
    this.productService.getFilteredProducts(
      this.searchQuery || '',
      this.filterCategory || '',
      this.filterDorm || '',
      this.filterStatus || '',
      this.sortOrder,
      this.orderBy
    ).subscribe(data => {
        this.products = data;
        this.products.forEach(product => {
          this.productService.downloadFile(product.id).subscribe((blob: Blob) => {
            let objectURL = URL.createObjectURL(blob);
            product.imageSrc = objectURL;
          });
        });
      });
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
