import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {RegisterComponent} from "./components/register/register.component";
import {MyProductsComponent} from "./components/my-products/my-products.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {PhotoViewerComponent} from "./components/photo-viewer/photo-viewer.component";
import {ChatComponent} from "./components/chat/chat.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";

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
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'viewer', component: PhotoViewerComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'edit-product/:id', component: EditProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
