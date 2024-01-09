import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit {

allProducts:any =[]

constructor(private api:ApiService,  private toaster:ToasterService){}


ngOnInit(): void {
 this.getWishlist()
}

getWishlist(){
  this.api.getWishlistApi().subscribe((res:any)=>{
    this.allProducts = res
    this.api.getWishlistCount()

  })
}


removeItem(id:any){
  this.api.deleteWishlistItemAPI(id).subscribe({
    next:(res:any)=>{
this.getWishlist()
    },
    error:(err:any)=>{
      console.log(err)
    }
  })

}

addtoCart(product:any){
  if(sessionStorage.getItem('token')){
    Object.assign(product,{quantity:1})
    this.api.addtocartAPI(product).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess(res)
        this.api.getCartCount()
        this.removeItem(product._id)
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

