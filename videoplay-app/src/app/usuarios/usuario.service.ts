import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable, throwError } from "rxjs";
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable(
)
export class UsuarioService {

  private urlEndPoint: string = "http://localhost:8080/api/usuarios";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,  private router: Router) { }

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

  getUsuario(id):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        this.router.navigate(['/usuarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');

        return throwError(e);
      }
        )
    )
  } 
  alta(usuario: Usuario): Observable <Usuario>{
    return this.http.post(this.urlEndPoint, usuario, {headers: this.httpHeaders} )
    .pipe(
      map((response: any) => response.usuario as Usuario),
      catchError( e => {

        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  update(usuario: Usuario): Observable <any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`,usuario, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    )
  }

delete(id: number): Observable<Usuario>{
  return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
    catchError( e => {
      
      if(this.isNotAuthorized(e)){
        return throwError(e);
      }
      
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje,e.error.error, 'error');
      return throwError(e);
    })
  )

}
  private isNotAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403 ){
      this.router.navigate(['/login']);
      return true;
    }
    return false;

  }
 
}
