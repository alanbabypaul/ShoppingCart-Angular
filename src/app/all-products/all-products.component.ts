import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
allProducts:any =[]
constructor (private api:ApiService ,private toaster:ToasterService){}



ngOnInit(): void {
  this.api.getAllproductsAPI().subscribe((res:any)=>{
    this.allProducts = res
  })
}

addtoWishlist(product:any){
if(sessionStorage.getItem('token')){
  this.api.addToWishListApi(product).subscribe({
    next:(res:any)=>{
      this.toaster.showSuccess(`${res.title}  added to wishlist`)
      this.api.getWishlistCount()
    },
error:(err:any)=>{
  this.toaster.showWarning(err.error)
}
  })
  
}else{
  this.toaster.showWarning('Operation Denied...Please Login')
}
}

addtoCart(product:any){
  if(sessionStorage.getItem('token')){
    Object.assign(product,{quantity:1})
    this.api.addtocartAPI(product).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess(res)
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err)
        this.toaster.showError(err.error)
      }
    })
   
  }else{
    this.toaster.showError('operation Denied.. please Login')
  }
  
}



}
