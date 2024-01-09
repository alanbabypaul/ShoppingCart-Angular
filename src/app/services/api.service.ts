import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  wishlistCount =  new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  SERVER_URL = "http://localhost:3000"
  constructor(private  http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

// get all product api
  getAllproductsAPI(){
   return this.http.get(`${this.SERVER_URL}/products/all`)

  }

  // register api
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }



  // loginApi
  
  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }


  // get single product api
  getProductApi(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }



// append token
appendTokenToHeader(){
  let headers = new HttpHeaders()
  const token = sessionStorage.getItem("token")
  if(token){
    headers = headers.append("Authorization",`Bearer ${token}`)
  }
  return {headers}
}


// wishlist/add
addToWishListApi(product:any){
  return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenToHeader())
}



// getqishlist
getWishlistApi(){
  return this.http.get(`${this.SERVER_URL}/wishlist/get-allproducts`,this.appendTokenToHeader())
}


getWishlistCount(){
  this.getWishlistApi().subscribe((res:any)=>{
    this.wishlistCount.next(res.length)
  })
}


// delete item from wishlist

deleteWishlistItemAPI(id:any){
 return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenToHeader())

}

// cart add

addtocartAPI(product:any){
  return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenToHeader())
}



// getcart
getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/cart/get-all-products`,this.appendTokenToHeader())
}


// get cart count
getCartCount(){
  this.getCartAPI().subscribe((res:any)=>{
    this.cartCount.next(res.length)
  })
}


// increement cart
cartIncreementApi(id:any){
 return   this.http.get(`${this.SERVER_URL}/cart/increement/${id}`,this.appendTokenToHeader())
}

// decrement cart
cartDecrementtApi(id:any){
  return   this.http.get(`${this.SERVER_URL}/cart/decreement/${id}`,this.appendTokenToHeader())
 }


//  /cart/delete
cartItemDeleteAPI(id:any){
return   this.http.delete(`${this.SERVER_URL}/cart/delete/${id}`, this.appendTokenToHeader())
}

emptyCartAPI(){
 return    this.http.delete(`${this.SERVER_URL}/cart/empty`, this.appendTokenToHeader())
  }
}


