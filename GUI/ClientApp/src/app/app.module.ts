import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {JwtInterceptor} from './services/jwt.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ConsultaComponent } from './tiquete/consulta/consulta.component';
import { RegistroComponent } from './tiquete/registro/registro.component';
import { AppRoutingModule } from './app-routing.module';
import { TiqueteService } from './services/tiquete.service';
import { PersonaService } from './services/persona.service';
import { FiltroPipe } from './pipe/filtro.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ConsultaComponent,
    RegistroComponent,
    FiltroPipe,
    AlertModalComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule
  ],
  entryComponents: [AlertModalComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
