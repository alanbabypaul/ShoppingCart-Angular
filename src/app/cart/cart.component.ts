import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  CartProducts:any =[]
  cartTotal:number = 0
constructor(private api:ApiService, private router:Router){}



ngOnInit(): void {
if(sessionStorage.getItem('token')){
  this.getCart()
}else{
  this.CartProducts = []
}
  
}



getCart(){
  this.api.getCartAPI().subscribe((res:any)=>{
  this.CartProducts = res
  this.getCartTotal()
  console.log(res)
  })
}






getCartTotal(){
  if(this.CartProducts.length>0){
    let total = 0
    this.CartProducts.forEach((product:any) => {
      total += product.grantTotal
    });
this.cartTotal = Math.ceil(total)

  }else{
    this.cartTotal = 0

  }
}



// cart increement
 increementCart(id:any){
this.api.cartIncreementApi(id).subscribe({
  next:(res:any)=>{
    this.getCart()
    this.api.getCartCount()
  },
  error(err) {
    console.log(err)
  },
})
 }



// cart increement
decrementCart(id:any){
  this.api.cartDecrementtApi(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(err:any)=>{
      console.log(err.error)
    },
  })
   }



   emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error)

      }
    })
   }

   
   removeOneCart(id:any){
    this.api.cartItemDeleteAPI(id).subscribe({
      next:(res:any)=>{
this.getCart()
this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error)

      }
    })
   }



checkout(){
  sessionStorage.setItem("total",JSON.stringify(this.cartTotal))
  this.router.navigateByUrl('/user/checkout')
}

}
