import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

loginUsername:string = ""
wishlistCount:number = 0
cartCount:number = 0

constructor(private router:Router, private api:ApiService){}
ngOnInit(): void {
  if(sessionStorage.getItem("username")){
    this.loginUsername = sessionStorage.getItem("username")?.split(" ")[0] || ""
    this.api.wishlistCount.subscribe((res:any)=>{
      this.wishlistCount = res
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount = res
      })
    })

    
  }else{
    this.loginUsername = ""
  }
}


logout(){
  this.loginUsername =""
  sessionStorage.removeItem("username")
  sessionStorage.removeItem("token")
  this.wishlistCount = 0
  this.cartCount = 0
  this.router.navigateByUrl("")
}

}
