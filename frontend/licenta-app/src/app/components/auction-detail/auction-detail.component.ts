import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactSellerComponent } from '../contact-seller/contact-seller.component';
import {ProductService} from "../../services/product.service";
import {BidService} from "../../services/bid.service";
import {BidPopupComponent} from "../bid-popup/bid-popup.component";

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  auction?: Auction;
  imageSrc?: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private bidService: BidService // Inject the BidService

  ) { }

  ngOnInit(): void {
    const auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.auctionService.getAuctionById(auctionId).subscribe(auction => {
      this.auction = auction;
      this.loadImage(auction.product.id);
    });
  }

  loadImage(id: number | undefined) {
    this.productService.downloadFile(id).subscribe(data => {
      const objectURL = URL.createObjectURL(data);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
      console.error('Error downloading the file', error);
    });
  }

  openContactSellerPopup(): void {
    // const dialogRef = this.dialog.open(ContactSellerComponent, {
    //   width: '400px',
    //   data: { sellerId: this.auction?.product.owner.id }
    // });
  }

  placeBid(): void {
    const dialogRef = this.dialog.open(BidPopupComponent, {
      width: '300px',
      data: { auction: this.auction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = localStorage.getItem('userId'); // Get the user ID from local storage
        if (userId && this.auction!=null) {
          const bid = {
            auctionId: this.auction.id,
            userId: Number(userId),
            amount: result
          };
          this.bidService.placeBid(bid).subscribe(
            response => {
              console.log('Bid placed successfully:', response);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([`/auction-details/${this.auction?.id}`]);
              });            },
            error => {
              console.error('Error placing bid:', error);
            }
          );
        } else {
          console.error('User ID not found in local storage');
        }
      }
    });
  }
}
