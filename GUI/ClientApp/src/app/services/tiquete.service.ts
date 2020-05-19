import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tiquete } from '../models/tiquete';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class TiqueteService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService) {
      this.baseUrl = baseUrl;
  }

  get(): Observable<Tiquete[]> {
    return this.http.get<Tiquete[]>(this.baseUrl + 'api/Tiquete')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Tiquete[]>('Consulta Tiquete', null))
        );
  }

  post(tiquete: Tiquete): Observable<Tiquete> {
    return this.http.post<Tiquete>(this.baseUrl + 'api/Tiquete', tiquete)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Tiquete>('Registrar Tiquete', null))
        );
}

}
