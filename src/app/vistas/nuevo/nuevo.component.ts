import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../servicios/api/api.service';
import { ResponseI } from '../../modelos/response.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseI } from '../../modelos/course.intergace';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from '../../servicios/alertas/alertas.service';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private apiService: ApiService,private api: ApiService, private router: Router, private alertasService:AlertasService) { }


  guardarCourses = new FormGroup({
    c_name: new FormControl('', Validators.required),
    c_description: new FormControl('', Validators.required),
    c_period: new FormControl('', Validators.required),
    c_numberStudent: new FormControl('', Validators.required),
    c_date_initial: new FormControl('', Validators.required),
    c_note_approved: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  createCourse(form: CourseI) {
    
    let token = this.getToken();
    // console.log(form);
    this.apiService.postCourse(form, token).subscribe({
      next: (data) => {
        // console.log(data);
        let responseI:ResponseI =data;
        let x: number = 200;

        if(responseI.code == x ){
          this.alertasService.showSucces("Datos guardados","Respuesta");
        }else{
          this.alertasService.showError("Error no se puede modificar","MSG")
        }
        

      },
      error: (e) => {
        console.log(e);
      }
      // complete: () => console.info('complete') 
    })
  }

  salirCurso(){
    this.router.navigate(["dashborad"]);
  }


  getToken() {
    return localStorage.getItem("token");
  }


  
}
