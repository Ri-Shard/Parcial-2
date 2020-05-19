import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private modalService: NgbModal ) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // tslint:disable-next-line: triple-equals
      if (error.status == '500') {
        this.mostrarError500(error);
      }

      // tslint:disable-next-line: triple-equals
      if (error.status == '400') {
        this.mostrarError400(error);
      }

      return of(result as T);
    };
  }
  public log(message: string) {
    console.log(message);
  }
  private mostrarError400(error: any): void {
    console.error(error);
    let contadorValidaciones = 0;
    let mensajeValidaciones =
    `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    // tslint:disable-next-line: forin
    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = mensajeValidaciones;

  }

  private mostrarError500(error: any): void {
    console.error(error);
    let contadorValidaciones = 0;
    let mensajeValidaciones =
    `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    // tslint:disable-next-line: forin
    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = mensajeValidaciones;

  }


}
