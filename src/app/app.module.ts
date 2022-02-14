import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
// import { LoginComponent } from './vistas/login/login.component';
// import { DashboardComponent } from './vistas/dashboard/dashboard.component';
// import { NuevoComponent } from './vistas/nuevo/nuevo.component';
// import { EditarComponent } from './vistas/editar/editar.component';
import { AppRoutingModule,routingComponets } from './app-routing.module';


import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponets,
    // LoginComponent,
    // DashboardComponent,
    // NuevoComponent,
    // EditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
