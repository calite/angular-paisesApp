import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit { //interfaz destinada a ejecutarse cuando el componente se crea
   
  @Output() onEnter : EventEmitter<string> = new EventEmitter(); //emisor para el campo de texto
  @Output() onDebounce : EventEmitter<string> = new EventEmitter(); //saltara cuando el usuario deje de escribir

  @Input() placeholder : string = ''; //recibimos la propiedad del placeholder para cambiar el texto del input

  //observable
  debouncer : Subject<string> = new Subject(); //observable para que se active cuando dejamos de escribir
  
  termino : string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(//esperara 300ms para emitir el subuscribe
      debounceTime(300)
    )
    this.debouncer.subscribe( valor => { //nos subscribimos al debouncer
      //console.log(valor)
      this.onDebounce.emit( valor ); //enviamos el valor

    });
  }

  buscar() {
    this.onEnter.emit( this.termino ); //enviamos el texto del input
  }

  teclaPersionada(){
    this.debouncer.next( this.termino );
  }

}
