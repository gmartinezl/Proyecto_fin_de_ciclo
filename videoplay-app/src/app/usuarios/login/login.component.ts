import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributos
   usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
  }

  /**
   * método para hacer login
   * E:
   * s:
   * SQL:
   */
  login(): void{
    console.log(this.usuario);

    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Nombre de usuario o contraseña vacias', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/inicio']);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success');
    });

  }

}
