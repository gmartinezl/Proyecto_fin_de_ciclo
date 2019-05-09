import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  //atributo definido e inyectado el valor
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
     this.usuarioService.getUsuarios().subscribe(
       usuarios => this.usuarios = usuarios
     );
  }

}
