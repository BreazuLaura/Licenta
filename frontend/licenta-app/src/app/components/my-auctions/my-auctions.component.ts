// my-auctions.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ProductService} from "../../services/product.service";
import {StopAuctionModalComponent} from "../stop-auction-modal/stop-auction-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css']
})
export class MyAuctionsComponent implements OnInit {
  auctions: Auction[] = [];
  userId: number;

  constructor(private auctionService: AuctionService, private sanitizer: DomSanitizer, private router: Router, private productService: ProductService, public dialog: MatDialog) {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? parseInt(userIdStr, 10) : 0;
  }

  ngOnInit(): void {
    this.loadUserAuctions();
  }

  loadUserAuctions(): void {
    this.auctionService.getUserAuctions(this.userId).subscribe(
      (auctions: Auction[]) => {
        this.auctions = auctions;
        this.auctions.forEach(auction => {
          this.productService.downloadFile(auction.product.id).subscribe((blob: Blob) => {
            let objectURL = URL.createObjectURL(blob);
            auction.imageSrc = objectURL;
          });

        })
      },
      error => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  goToAddAuction(): void {
    this.router.navigate(['/add-auction']);
  }

  editAuction(auction: any): void {
    this.router.navigate(['/edit-auction', auction.id]);
  }

  stopAuction(auction: any): void {
    const dialogRef = this.dialog.open(StopAuctionModalComponent, {
      width: '300px',
      data: { auction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auctionService.stopAuction(auction.id).subscribe(response => {
          console.log('Auction stopped successfully', response);
          this.loadUserAuctions(); // Refresh the auction list
        });
      }
    });
  }
}
