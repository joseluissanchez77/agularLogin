import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toastrService:ToastrService) { }

  showSucces(texto,titulo){
    this.toastrService.success(texto,titulo);

  }


  showError(texto,titulo){
    this.toastrService.error(texto,titulo);

  }
}
