import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais !: Country; //pais puede ser null

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }


  ngOnInit(): void {
    /*
    this.activatedRoute.params//leemos la ruta de la pagina 
      .subscribe( ({ id }) => { //tambien se puede obtener usando param
        console.log( id );
        
        this.paisService.getPaisPorAlpha( id )//llamamos al metodo para traer los paises
          .subscribe( pais => {
            console.log( pais );
          });

      });
      */
    //otra manera
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id) ), //operadores rx
        tap( console.log ) //forma corta de impresion en consola
      )
      .subscribe(pais => {
        //console.log(pais)
        this.pais = pais[0];
      });
  }

}
