import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributos
  private usuario: Usuario;
  constructor() {
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
     
      return;
    }

  }

}
