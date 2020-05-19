import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultaComponent} from './tiquete/consulta/consulta.component';
import {RegistroComponent} from './tiquete/registro/registro.component';
import {Routes,RouterModule}from '@angular/router';

const routes: Routes = [
    {
    path: 'Consulta',
    component:ConsultaComponent
    },
    {
      path: 'Registro',
      component:RegistroComponent
    }
  ];
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
    exports:[RouterModule]
})
export class AppRoutingModule { }
