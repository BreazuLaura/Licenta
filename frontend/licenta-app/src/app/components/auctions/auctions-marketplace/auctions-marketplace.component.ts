import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../services/auction.service';
import { ProductService } from '../../../services/product.service';
import { Auction } from '../../../models/auction';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-auctions-marketplace',
  templateUrl: './auctions-marketplace.component.html',
  styleUrls: ['./auctions-marketplace.component.css']
})
export class AuctionsMarketplaceComponent implements OnInit {
  auctions: Auction[] = [];
  searchQuery: string = '';
  filterCategory: string = '';
  filterDorm: string = '';
  filterStatus: string = '';
  sortOrder: string = 'asc';
  orderBy: string = 'name';

  categories: string[] = ['ELECTRONICS', 'FURNITURE', 'FASHION', 'FOOD', 'APPLIANCES'];
  dorms: string[] = ['CAMIN_P1', 'CAMIN_P3', 'CAMIN_P5', 'CAMIN_P6', 'CAMIN_P16', 'CAMIN_P20', 'CAMIN_P22'];
  statuses: string[] = ['AVAILABLE', 'SOLD'];

  constructor(
    private auctionService: AuctionService,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      data => {
        this.auctions = data;
        this.auctions.forEach(auction => {
          this.productService.downloadFile(auction.product.id).subscribe((blob: Blob) => {
            let objectURL = URL.createObjectURL(blob);
            auction.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
      },
      error => {
        console.error('Error fetching auctions', error);
      }
    );
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
