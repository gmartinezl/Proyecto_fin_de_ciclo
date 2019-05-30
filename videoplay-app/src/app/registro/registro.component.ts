import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/usuarios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  public alta(): void{
    this.usuarioService.alta(this.usuario).subscribe(
      //una vez que se crea el objeto retornamos a la pagina clientes
      json => {
        this.router.navigate(['/inicio'])
        Swal.fire('Bienvenido: ',`${json.mensaje}: ${json.usuario.username}`, 'success');
      }

    );
  }

}
