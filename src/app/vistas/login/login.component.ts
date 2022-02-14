import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';

import { ResponseI } from '../../modelos/response.interface';


import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private api: ApiService, private router: Router) { }


  erroStatus: boolean = false;
  errorMsj: any = "";


  ngOnInit(): void {
    this.checkLocalStorage();

  }

  //verificar si existe el token en storage
  checkLocalStorage() {
    if (localStorage.getItem("token")) {
      this.router.navigate(["dashborad"]);
    }
  }


  onLogin(form: LoginI) {

    this.api.loginByIdEmail(form).subscribe({
      next: (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.token_type == "Bearer") {

          localStorage.setItem("token", dataResponse.accessToken);
          this.router.navigate(["dashborad"]);
        }
      },
      error: (e) => {
        console.log(e);
        this.erroStatus = true;
        this.errorMsj = e.error.detail;
      }
      // complete: () => console.info('complete') 
    })
    /*  this.api.loginByIdEmail(form).subscribe(
       data => {
         // console.log("else");
         let dataResponse: ResponseI = data;
 
         if (dataResponse.token_type == "Bearer") {
 
           localStorage.setItem("token", dataResponse.accessToken);
           this.router.navigate(["dashborad"]);
         } else {
           console.log("else");
           this.erroStatus = true;
 
           this.errorMsj = dataResponse.statusText
         }
         // console.log(data);
       },
       err => {
         this.erroStatus = true;
         this.errorMsj=err.error.detail;
         // err.error.detail.forEach(element => this.errorMsj=element);
         
       }
     ); */


  }

}
