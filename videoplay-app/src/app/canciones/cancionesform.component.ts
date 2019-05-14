import { Component, OnInit } from '@angular/core';
import { Cancion } from './cancion';
import { CancionService } from './cancion.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancionesform',
  templateUrl: './cancionesform.component.html',
  styleUrls: ['./cancionesform.component.css']
})
export class CancionesformComponent implements OnInit {

  private cancion: Cancion = new Cancion();
  constructor(private cancionService: CancionService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCancion();
  }

  subir(): void {
    this.cancionService.subir(this.cancion).subscribe(
      //una vez que se crea el objeto retornamos a la pagina clientes
      json => {
        this.router.navigate(['/canciones'])
        Swal.fire('Nueva canción', `${json.mensaje}: ${json.cancion.titulo}`, 'success');
      }

    );
  }

  cargarCancion(): void{
      this.activatedRoute.params.subscribe( params => {
        let id = params['id']
        if(id){
         this.cancionService.getCancion(id).subscribe ( (cancion) => this.cancion = cancion)
        }
      }
        )
  }

  editar(): void{
    this.cancionService.update(this.cancion).subscribe(
      json => {
        this.router.navigate(['/canciones'])//redirecciono a clientes
        //muestro mensaje alerta
        Swal.fire('Cancion Actualizada',`${json.mensaje}: ${json.cancion.nombre}`, 'success');
      }
    )
  }

 
  
}
