import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import {  authGuard } from './auth.guard'; // Adjust the path as per your project structure
import { SelerAddProductComponent } from './seler-add-product/seler-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path :'',
    component:HomeComponent,

  },
  {
    path:'seller-auth',
    component:SellerAuthComponent,
  },

  {
    component: SearchComponent,
    path:'search/:query'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    component:MyOrdersComponent,
    path:'my-orders'
  },
  {
    component:CartPageComponent,
    path:'cart-page'
  },

  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component:DashboardComponent,
    path:'dashboard'
  },


  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard] // Utilisez votre AuthGuard ici
  },

  {
    component:SelerAddProductComponent,
    path:'seller-add-product',
    canActivate: [authGuard] // Utilisez votre AuthGuard ici
  },
  {
    component: SellerUpdateProductComponent ,
      
    path:'seller-update-product/:id',
    canActivate: [authGuard] // Utilisez votre AuthGuard ici

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
