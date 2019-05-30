import { Component, OnInit } from '@angular/core';
import { Cancion } from './cancion';
import { CancionService } from './cancion.service';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/usuarios/auth.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

   canciones: Cancion[];

  constructor(private cancionService: CancionService, private authService: AuthService) { }

  ngOnInit() {
    this.cancionService.getCanciones().subscribe(
      canciones => this.canciones = canciones
    );
  }

  /**
   * 
   * @param cliente funcion para borrar datos de cancion
   */
  borrar(cancion: Cancion): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `Esta seguro de eliminar la canción: ${cancion.titulo}  ${cancion.artista}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.cancionService.delete(cancion.id).subscribe(

          response => {
            this.canciones = this.canciones.filter(cli => cli !== cancion)
            swalWithBootstrapButtons.fire(
              'Canción Eliminada!',
              `Canción ${cancion.titulo} eliminado con exito.`,
              'success'
            )
          }
        )
      } 
    })

  }

}
