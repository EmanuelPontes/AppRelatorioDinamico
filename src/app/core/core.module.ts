import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    HttpClientModule 
  ],
  exports: [
    HomeModule
  ]
})
export class CoreModule { }
