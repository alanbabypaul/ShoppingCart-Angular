import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast } from 'ngx-toastr';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })
 
constructor(private fb:FormBuilder , private toaster:ToasterService,private api:ApiService,private router:Router){}

register(){

  if(this.registerForm.valid){
    const username = this.registerForm.value.username
  const email = this.registerForm.value.email
  const password = this.registerForm.value.password
  const user = {username,password,email}
this.api.registerAPI(user).subscribe({
  next:(res:any)=>{
    this.toaster.showSuccess(`${res.username} registration successfull`)
    this.router.navigateByUrl('/user/login')
  },
  error:(data:any)=>{
    this.toaster.showError(data.error)
    this.registerForm.reset()

  }
})
  }else{
    this.toaster.showError('invalid form')
  }
  
}

}
