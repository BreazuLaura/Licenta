import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/products/product-marketplace/product-list.component';
import { ProductFormComponent } from './components/products/add-product/product-form.component';
import { ProductDetailComponent } from './components/products/product-details/product-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { MyProductsComponent } from './components/products/my-products/my-products.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { ContactSellerComponent } from './components/contact-seller/contact-seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyAuctionsComponent } from './components/auctions/my-auctions/my-auctions.component';
import { AddAuctionComponent } from './components/auctions/add-auction/add-auction.component';
import { EditAuctionComponent } from './components/auctions/edit-auction/edit-auction.component';
import { AuctionsMarketplaceComponent } from './components/auctions/auctions-marketplace/auctions-marketplace.component';
import { AuctionDetailComponent } from './components/auctions/auction-detail/auction-detail.component';
import { BidPopupComponent } from './components/auctions/bid-popup/bid-popup.component';
import {MatInputModule} from "@angular/material/input";
import { DormMapComponent } from './components/dorm-map/dorm-map.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { StopAuctionModalComponent } from './components/auctions/stop-auction-modal/stop-auction-modal.component';
import {MatButtonModule} from "@angular/material/button";
import { MyServicesComponent } from './components/services/my-services/my-services.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddNewServiceComponent} from './components/services/add-new-service/add-new-service.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ServicesMarketplaceComponent } from './components/services/services-marketplace/services-marketplace.component';
import { BookServiceComponent } from './components/services/book-service/book-service.component';




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
    StopAuctionModalComponent,
    MyServicesComponent,
    AddNewServiceComponent,
    ServicesMarketplaceComponent,
    BookServiceComponent
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
    MatNativeDateModule,
    MatButtonModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
