import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule
  ],
  exports: [
    HomeModule
  ]
})
export class CoreModule { }
