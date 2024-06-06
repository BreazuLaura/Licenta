import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactSellerComponent } from '../contact-seller/contact-seller.component';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  auction: Auction | undefined;
  imageSrc?: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    public dialog: MatDialog
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
    // Logic to place a bid
  }
}
