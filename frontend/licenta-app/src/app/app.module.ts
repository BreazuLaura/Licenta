import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-marketplace/product-list.component';
import { ProductFormComponent } from './components/add-product/product-form.component';
import { ProductDetailComponent } from './components/product-details/product-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { ContactSellerComponent } from './components/contact-seller/contact-seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyAuctionsComponent } from './components/my-auctions/my-auctions.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { AuctionsMarketplaceComponent } from './components/auctions-marketplace/auctions-marketplace.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { BidPopupComponent } from './components/bid-popup/bid-popup.component';
import {MatInputModule} from "@angular/material/input";
import { DormMapComponent } from './components/dorm-map/dorm-map.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    UserFormComponent,
    UserListComponent,
    UserDetailsComponent,
    RegisterComponent,
    MyProductsComponent,
    MyProfileComponent,
    PhotoViewerComponent,
    ContactSellerComponent,
    ChatComponent,
    EditProductComponent,
    MyAuctionsComponent,
    AddAuctionComponent,
    EditAuctionComponent,
    AuctionsMarketplaceComponent,
    AuctionDetailComponent,
    BidPopupComponent,
    DormMapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
