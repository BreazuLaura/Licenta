import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuctionService } from '../../services/auction.service';
import { AuctionFormDTO } from '../../models/auction-form-dto.model';
import { Category, Dorm, SaleType, Status } from '../../models/enums';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent implements OnInit {
  auction: AuctionFormDTO = new AuctionFormDTO();
  selectedFile: File | null = null;
  categories = Object.keys(Category);
  dorms = Object.keys(Dorm);

  constructor(
    private auctionService: AuctionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auction.status = Status.AVAILABLE;
    this.auction.saleType = SaleType.AUCTIONPLACE;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('auction', new Blob([JSON.stringify(this.auction)], { type: 'application/json' }));
      formData.append('file', this.selectedFile);

      const userId = localStorage.getItem('userId'); // Get the userId from local storage

      if (userId) {
        this.auctionService.createAuction(formData, +userId).subscribe(
          event => {
            if (event.type === HttpEventType.Response) {
              console.log('Auction created successfully');
              this.router.navigate(['/my-auctions']);
            }
          },
          error => {
            console.error('Error creating auction', error);
          }
        );
      } else {
        console.error('User ID not found in local storage');
      }
    }
  }
}
