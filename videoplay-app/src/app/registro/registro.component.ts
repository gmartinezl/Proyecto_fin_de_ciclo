import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  public alta(): void{
    this.usuarioService.alta(this.usuario).subscribe(
      usuario =>{ this.router.navigate(['/usuarios'])
      Swal.fire('Bienvenido a Videoplay!',`${usuario.nombre}!`,'success');
    }
    )
  }
}
