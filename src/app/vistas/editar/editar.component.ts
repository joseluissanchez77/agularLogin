import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseI } from '../../modelos/course.intergace';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI} from '../../modelos/response.interface'
import { AlertasService } from '../../servicios/alertas/alertas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService, private alertasService:AlertasService) { }

  // datosCourse : CourseI;
  datosCourse!: CourseI;
  editarCourses = new FormGroup({
    c_name: new FormControl('', Validators.required),
    c_description: new FormControl('', Validators.required),
    c_period: new FormControl('', Validators.required),
    c_numberStudent: new FormControl('', Validators.required),
    c_date_initial: new FormControl('', Validators.required),
    c_note_approved: new FormControl('', Validators.required),
  });
  ngOnInit(): void {

    let courseId = this.activatedRoute.snapshot.paramMap.get('id');

    let token = this.getToken();

    this.apiService.getSingleCourse(courseId, token).subscribe({
      next: (data) => {
        this.datosCourse = data;
        this.editarCourses.setValue({
          "c_name": this.datosCourse.c_name,
          "c_description": this.datosCourse.c_description,
          "c_period": this.datosCourse.c_period,
          "c_numberStudent": this.datosCourse.c_numberStudent,
          "c_date_initial": this.datosCourse.c_date_initial,
          "c_note_approved": this.datosCourse.c_note_approved,
        })
        console.log(data);

      },
      error: (e) => {
        console.log(e);
      }
      // complete: () => console.info('complete') 
    })
  }

  getToken() {
    return localStorage.getItem("token");
  }


  updateForm(form: CourseI) {
    
    let token = this.getToken();

    let courseId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.putCourse(form, token,courseId).subscribe({
      next: (data) => {
        // console.log(data);
        let responseI:CourseI =data;
        let x: number = 200;

        if(responseI.code == x ){
          this.alertasService.showSucces("Datos modificados","Respuesta");
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



  eliminarCurso(){
    console.log("eliminar");

    let datosCourseI =this.editarCourses.value;
    let token = this.getToken();

    let courseId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.deleteCourse(datosCourseI, token,courseId).subscribe({
      next: (data) => {
       
        //console.log(data);
        let CourseI = data;
        let x: number = 200;

        if(CourseI.code == x ){
          this.alertasService.showSucces("Datos modificados","Respuesta");
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
}
