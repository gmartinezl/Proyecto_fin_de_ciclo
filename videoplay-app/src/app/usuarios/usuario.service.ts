import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable } from "rxjs";
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable(
)
export class UsuarioService {

  private urlEndPoint: string = "http://localhost:8080/api/usuarios";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  /**
   * Función que devuelve los usuarios en el sistema. Por medio de un Stream Observable que se caracteriza
   * por ser asíncrono y no bloquear el sistema.
   * E:
   * S: array de usuarios.
   * SQL:
   */
  getUsuarios(): Observable <Usuario[]>{
    return this.http.get <Usuario[]> (this.urlEndPoint);
  }

  alta(usuario: Usuario): Observable <Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders}) ;
  }

  /*
  private isNotAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403 ){
      this.router.navigate(['/login']);
      return true;
    }
    return false;

  }*/
}
