import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable, throwError } from "rxjs";
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './usuarios/auth.service';


@Injectable(
)
export class UsuarioService {

  private urlEndPoint: string = "http://localhost:8080/api/usuarios";
  private registroEndPoint: string = "http://localhost:8080/api/registro";

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,  private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;

    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
    
    return this.httpHeaders;

  }

  /**
   * Función que devuelve los usuarios en el sistema. Por medio de un Stream Observable que se caracteriza
   * por ser asíncrono y no bloquear el sistema.
   * E:
   * S: array de usuarios.
   * SQL:
   */
  getUsuarios(): Observable <Usuario[]>{
    return this.http.get <Usuario[]> (this.urlEndPoint, { headers: this.agregarAuthorizationHeader()});
  }

  alta(usuario: Usuario): Observable <any>{
    return this.http.post<any>(this.registroEndPoint, usuario, { headers: this.httpHeaders} ).pipe(
      catchError( e => {
  
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  
private isNotAuthorized(e): boolean{
  if(e.status == 401 ) {
    if(this.authService.isAuthenticated())
      this.authService.logout();
    this.router.navigate(['/login']);
    return true;
  }
  if(e.status == 403 ){
    Swal.fire('Acceso denegado',`${this.authService.usuario.username} no tienes acceso a este recurso...`,'warning');
    this.router.navigate(['/canciones']);
    return true; 
  }
  return false;

}
 
}
