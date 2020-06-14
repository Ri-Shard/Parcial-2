import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Tiquete } from 'src/app/models/tiquete';
import { TiqueteService } from 'src/app/services/tiquete.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  tiquetes: Tiquete[];
  searchText: string;
  constructor(private tiqueteService: TiqueteService) { }

  ngOnInit() {

    this.tiqueteService.get().subscribe(result => {
      this.tiquetes = result;
    });

  }


}
