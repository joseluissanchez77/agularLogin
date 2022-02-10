import { Injectable } from '@angular/core';


import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'

import{ Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://apijosesanchezv1.test/api/";
  constructor(private http:HttpClient) { }

  loginByIdEmail(form:LoginI):Observable<ResponseI>{
    
    let direcion = this.url+"login"; 

    return this.http.post<ResponseI>(direcion, form);
    
  }
}
