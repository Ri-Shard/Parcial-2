import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultaComponent} from './tiquete/consulta/consulta.component';
import {RegistroComponent} from './tiquete/registro/registro.component';
import {Routes,RouterModule}from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {
    path: 'Consulta',
    component:ConsultaComponent,canActivate: [AuthGuard]
    },
    {
      path: 'Registro',
      component:RegistroComponent,canActivate: [AuthGuard]
    },
  { path: 'login', component: LoginComponent },
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
