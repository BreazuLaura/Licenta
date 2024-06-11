import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ProductListComponent } from './components/products/product-marketplace/product-list.component';
import { ProductFormComponent } from './components/products/add-product/product-form.component';
import { ProductDetailComponent } from './components/products/product-details/product-detail.component';
import {RegisterComponent} from "./components/register/register.component";
import {MyProductsComponent} from "./components/products/my-products/my-products.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {PhotoViewerComponent} from "./components/photo-viewer/photo-viewer.component";
import {ChatComponent} from "./components/chat/chat.component";
import {EditProductComponent} from "./components/products/edit-product/edit-product.component";
import {AddAuctionComponent} from "./components/auctions/add-auction/add-auction.component";
import {MyAuctionsComponent} from "./components/auctions/my-auctions/my-auctions.component";
import {EditAuctionComponent} from "./components/auctions/edit-auction/edit-auction.component";
import {AuctionsMarketplaceComponent} from "./components/auctions/auctions-marketplace/auctions-marketplace.component";
import {AuctionDetailComponent} from "./components/auctions/auction-detail/auction-detail.component";
import {DormMapComponent} from "./components/dorm-map/dorm-map.component";
import {MyServicesComponent} from "./components/services/my-services/my-services.component";
import {AddNewServiceComponent} from "./components/services/add-new-service/add-new-service.component";
import {ServicesMarketplaceComponent} from "./components/services/services-marketplace/services-marketplace.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products-marketplace', component: ProductListComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-form/:id', component: UserFormComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'users', component: UserListComponent },
  { path: 'product-details/:id', component: ProductDetailComponent },
  { path: 'my-products', component: MyProductsComponent },
  { path: 'my-profile/:id', component: MyProfileComponent},
  { path: 'viewer', component: PhotoViewerComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'edit-product/:id', component: EditProductComponent},
  { path: 'my-auctions', component: MyAuctionsComponent },
  { path: 'add-auction', component: AddAuctionComponent },
  { path: 'edit-auction/:id', component: EditAuctionComponent },
  { path: 'auctionplace', component: AuctionsMarketplaceComponent },
  { path: 'auction-details/:id', component: AuctionDetailComponent },
  { path: 'dorm-map', component: DormMapComponent },
  { path: 'my-services', component: MyServicesComponent },
  { path: 'add-new-service', component: AddNewServiceComponent},
  { path: 'services-marketplace', component: ServicesMarketplaceComponent }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
