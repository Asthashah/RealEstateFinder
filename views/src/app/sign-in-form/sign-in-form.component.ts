import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {User}  from '../model/user';
import {AuthService} from '../services/auth.service';


@Component({
 selector: 'app-sign-in-form',
 templateUrl: './sign-in-form.component.html',
 styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

 myForm :FormGroup;
 
 constructor(private authService: AuthService, private router: Router) { }

 onSubmit(){
   
   console.log(this.myForm.value.email);

   const user = {email:this.myForm.value.email, password: this.myForm.value.password};
   this.authService.signin(user)
   .subscribe(
     data => {
     
       localStorage.setItem('token',data.token);
       localStorage.setItem('userId', data.userId);
       localStorage.setItem('userType',data.userType);
       localStorage.setItem('userName',data.email);
     

      if(data.userType=='seller'){

           this.router.navigate(['sellerMainPage']);
      }
      else
      this.router.navigate(['apartmentlist']);
     
   },

   

   error => console.error(error)
);
   this.myForm.reset();
 }

 ngOnInit() {
 
   this.myForm = new FormGroup({
     email: new FormControl(null, [
         Validators.required,
         Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
     ]),
     password: new FormControl(null, Validators.required)
 });
 }

}