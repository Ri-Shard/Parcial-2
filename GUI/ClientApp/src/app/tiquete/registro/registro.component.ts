import { Component, OnInit } from '@angular/core';
import { Tiquete } from 'src/app/models/tiquete';
import { TiqueteService } from 'src/app/services/tiquete.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    formGroup: FormGroup;

  tiquete: Tiquete;
  tiquetes: Tiquete[];
  _nombre = '';
  _id: string;
  _valor: number;
  obtenerId: string;
  searchText: string;
  encontro = false;

  constructor(private tiqueteService: TiqueteService, private formBuilder: FormBuilder,
         private modalService: NgbModal ) { }

  ngOnInit(): void {
        this.buildForm();
        this.tiqueteService.get().subscribe(result => {
      this.tiquetes = result;
    });
  }

  private buildForm() {

        this.formGroup = this.formBuilder.group({
          idCliente: ['', Validators.required],
          nombre: ['', Validators.required],
          codigo: ['', [Validators.required]],
          ruta: ['', [Validators.required]],
          valor: [0, [Validators.required]]

        });
      }
    get control() {
      return this.formGroup.controls;
       }

      onSubmit() {
            if (this.formGroup.invalid) {
              return;
            }
        this.add();
          }

        buscar(index: string) {
          this.encontro = false;
          // tslint:disable-next-line: triple-equals
          if (index == '') {
            const messageBox = this.modalService.open(AlertModalComponent);
            messageBox.componentInstance.title = 'Resultado Operación';
            messageBox.componentInstance.message = 'Escriba una identificación';
            this._nombre = '';
          } else {
            this.tiquetes.forEach(element => {
              // tslint:disable-next-line: triple-equals
              if (index == element.idCliente) {
                this._nombre = element.nombre;
                console.log('si esta');
                this.encontro = true;
                return;
              }
                console.log('no esta');
            });
            console.log(this.formGroup);
            if (!this.encontro) {
              const messageBox = this.modalService.open(AlertModalComponent);
              messageBox.componentInstance.title = 'Resultado Operación';
              messageBox.componentInstance.message = 'Usted no se encuentra registrado en el sistema, por favor ingrese su nombre para registrarse';
              this._nombre = '';
              console.log(this.formGroup);
            }
          }
        }
        asignarPrecio(opcion: string) {
          // tslint:disable-next-line: triple-equals
          if (opcion == 'Valledupar - Bogotá') {
            this._valor = 90000;
         // tslint:disable-next-line: triple-equals
          } else if (opcion == 'Valledupar - Barranquilla') {
            this._valor = 35000;
          // tslint:disable-next-line: triple-equals
          } else if (opcion == 'Valledupar - Santa Marta') {
            this._valor = 40000;
          // tslint:disable-next-line: triple-equals
          } else if (opcion == 'Valledupar - Cartagena') {
            this._valor = 60000;
          }
        }
  add() {
    this.tiquete = new Tiquete();
    this.tiquete = this.formGroup.value;
    this.tiquete.valor = this._valor;
    if (this._nombre.length > 0) {
      this.tiquete.nombre = this._nombre;
    }
    console.log(this.tiquete);
    this.tiqueteService.post(this.tiquete).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent);
        messageBox.componentInstance.title = 'Resultado Operación';
        messageBox.componentInstance.message = 'Tiquete comprado ';
        this.tiquete = p;
      }
    });
  }
}
