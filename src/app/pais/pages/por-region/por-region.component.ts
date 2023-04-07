import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `
  ]
})
export class PorRegionComponent {

  regiones : string[] = ['europe','africa','oceania','america','asia'];
  regionActiva : string = '';
  hayError : boolean = false;
  paises : Country[] = []

  constructor(private paisService : PaisService) { }
    
  getClaseCSS( region : string ) { //cambiado de clase para los botones
    return  (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activarRgion( region : string) {

    if( region === this.regionActiva ) { return } //evitamos el refresh

    this.regionActiva = region;
    this.paises = []; //purgar paises

    this.paisService.buscarPorRegion( this.regionActiva ) //buscador de paises
      .subscribe( paises => this.paises = paises)

      
  }

}
