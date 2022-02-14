import { Injectable } from '@angular/core';


import { LoginI } from '../../modelos/login.interface';

import { ListCourseI } from '../../modelos/listCourse.interface';
import { ResponseI } from '../../modelos/response.interface';
import { CourseI } from '../../modelos/course.intergace';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://apijosesanchezv1.test/api/";
  constructor(private http: HttpClient) { }

  loginByIdEmail(form: LoginI): Observable<ResponseI> {

    let direcion = this.url + "login";

    return this.http.post<ResponseI>(direcion, form);

  }

  // page=2&size=2&sort=id&type_sort=asc&data=all
  getAllCourse(page: number, size: number, sort: string, type_sort: string, data: string): Observable<ListCourseI> {

    const auth_token = localStorage.getItem("token");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    };

    let direcion = this.url + "courses?page=" + page + "&size=" + size + "&sort=" + sort + "&type_sort=" + type_sort;//&data=all; 


    return this.http.get<ListCourseI>(direcion, httpOptions);
  }


  getSingleCourse(id, token): Observable<CourseI> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let course = this.url + "courses/" + id;

    return this.http.get<CourseI>(course, httpOptions);
  }




  putCourse(form: CourseI, token, courseId): Observable<CourseI> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let course = this.url + "courses/" + courseId;



    return this.http.put<CourseI>(course, form, httpOptions);
  }


  deleteCourse(form: CourseI, token, courseId): Observable<ResponseI> {
    console.log( token, courseId);

    let course = this.url + "courses/" + courseId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body:form
    };
    
    return this.http.delete<ResponseI>(course, httpOptions);
  }



  postCourse(form: CourseI, token): Observable<ResponseI> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    let course = this.url + "courses";

    return this.http.post<ResponseI>(course, form, httpOptions);
  }


  logout(): Observable<ResponseI> {

    const auth_token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    };

    let direcion = this.url + "logout";

    return this.http.get<ResponseI>(direcion,httpOptions);

  }
}
