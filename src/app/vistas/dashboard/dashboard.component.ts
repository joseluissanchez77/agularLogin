import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../servicios/api/api.service'
import { Router } from '@angular/router'
import { ListCourseI } from 'src/app/modelos/listCourse.interface';
import { ResponseI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private api: ApiService, private router: Router) { }
  courses!: any[];

  ngOnInit(): void {
    this.api.getAllCourse(1, 100, 'id', 'asc', '').subscribe({
      next: (data) => {
        this.courses = data.data;

      },
      error: (e) => {
        console.log(e);
      }
      // complete: () => console.info('complete') 
    })
  }


  editCourse(id){
    this.router.navigate(['editar',id]);
  }

  addCourse(){
    this.router.navigate(['nuevo']);
  }

  cerrarSession(){
    console.log("cerrar session");
    this.api.logout().subscribe({
      next: (data) => {
        console.log(data);
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      error: (e) => {
        console.log(e);
       
      }
      // complete: () => console.info('complete') 
    })
    
  }



}
