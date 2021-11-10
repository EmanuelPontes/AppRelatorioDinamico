import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from './components/home/home.component';
import { CadastroAtributosComponent } from './components/cadastro-atributos/cadastro-atributos.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { CadastroAtributosService } from './services/cadastro-atributos/cadastro-atributos.service';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', redirectTo:'/home/cadAtrb', pathMatch:'full'},
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      {path: 'cadAtrb', component: CadastroAtributosComponent},
      {path: 'relto', component: RelatoriosComponent}
    ]
  },
  
];

@NgModule({
  declarations: [
    HomeComponent,
    CadastroAtributosComponent,
    RelatoriosComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    CadastroAtributosService
  ]
})
export class HomeModule { }
