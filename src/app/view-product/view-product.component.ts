import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

constructor(private route:ActivatedRoute,private api: ApiService, private toaster:ToasterService){}
product:any ={}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    console.log(res)
    const {id} = res
    // get details of single product  api call 
    this.getProductDetails(id)

  })
}
// new function 
getProductDetails(id:any){
this.api.getProductApi(id).subscribe({
  next:(res:any)=>{
this.product = res
  },
  error:(err:any)=>{
    console.log(err.error)
  }
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
