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
}
