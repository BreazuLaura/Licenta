import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../../../services/auction.service';
import { ProductService } from '../../../services/product.service';
import { Auction } from '../../../models/auction';
import { Category, Dorm } from '../../../models/enums';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {User} from "../../../models/user";

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
  imageError = false;  // Add this property


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

      if (this.auction.bids) {
        this.auction.bids.sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
      }
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

  getUserInitials(user: User | undefined): string {  // Change the parameter type to handle undefined
    if (!user) return '';
    const firstNameInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
    const lastNameInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
  }

}
