import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

{

  path:'',component:AllProductsComponent
},

{

  path:'view/:id',component:ViewProductComponent
},

{

  path:'user/login',component:LoginComponent
},


{

  path:'user/register',component:RegisterComponent
},


{

  path:'user/wishlist',canActivate:[authGuard],component:WishlistComponent
},


{

  path:'user/cart',canActivate:[authGuard],component:CartComponent
},

{

  path:'user/checkout',canActivate:[authGuard],component:CheckoutComponent
},


{

  path:'**',redirectTo:''
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
