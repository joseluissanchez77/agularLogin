import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';


import { ResponseI } from '../../modelos/response.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSession(){
    console.log("cerrar session");
    this.api.logout().subscribe({
      next: (data) => {
        console.log(data);
        localStorage.removeItem('token');
        this.router.navigate(["nuevo"]);
      },
      error: (e) => {
        console.log(e);
       
      }
      // complete: () => console.info('complete') 
    })
    
  }

}
