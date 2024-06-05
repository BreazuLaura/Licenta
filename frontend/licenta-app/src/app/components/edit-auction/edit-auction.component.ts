import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { ProductService } from '../../services/product.service';
import { Auction } from '../../models/auction';
import { Category, Dorm } from '../../models/enums';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css']
})
export class EditAuctionComponent implements OnInit {
  auction: Auction | undefined;
  categories = Object.values(Category);
  dorms = Object.values(Dorm);
  imageSrc?: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.auctionService.getAuctionById(auctionId).subscribe(auction => {
      this.auction = auction;
      this.loadImage(auction.product.id);
    });
  }

  loadImage(productId: number | undefined): void {
    this.productService.downloadFile(productId).subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }

  onSubmit(): void {
    if (this.auction) {
      this.auctionService.updateAuction(this.auction.id, this.auction).subscribe(
        () => {
          console.log('Auction updated successfully');
          this.router.navigate(['/my-auctions']);
        },
        error => {
          console.error('Error updating auction', error);
        }
      );
    }
  }

  onDelete(): void {
    if (this.auction) {
      this.auctionService.deleteAuction(this.auction.id).subscribe(
        () => {
          console.log('Auction deleted successfully');
          this.router.navigate(['/my-auctions']);
        },
        error => {
          console.error('Error deleting auction', error);
        }
      );
    }
  }
}
