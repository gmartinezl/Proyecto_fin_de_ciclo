import { Component, OnInit } from '@angular/core';
import { Cancion } from './cancion';
import { CancionService } from './cancion.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

   canciones: Cancion[];

  constructor(private cancionService: CancionService) { }

  ngOnInit() {
    this.cancionService.getCanciones().subscribe(
      canciones => this.canciones = canciones
    );
  }

}
