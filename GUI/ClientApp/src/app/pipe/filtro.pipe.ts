import { Pipe, PipeTransform } from '@angular/core';
import { Tiquete } from '../models/tiquete';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(tiquete: Tiquete[], searchText: string): any {
    if (searchText == null) { return tiquete; }
   return tiquete.filter(p =>
   p.nombre.toLowerCase()
  .indexOf(searchText.toLowerCase()) !== -1);
    }
}
