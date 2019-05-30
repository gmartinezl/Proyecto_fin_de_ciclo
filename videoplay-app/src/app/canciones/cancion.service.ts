import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cancion } from './cancion';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/usuarios/auth.service';

@Injectable({providedIn: 'root'})
export class CancionService {

  private urlEndPoint = 'http://localhost:8080/api/canciones';
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
  
  getCanciones(): Observable <Cancion[]> {
    return this.http.get <Cancion[]> (this.urlEndPoint, { headers: this.agregarAuthorizationHeader()});
  }

  getCancion(id: number): Observable<Cancion>{
    return this.http.get<Cancion> (`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.router.navigate(['/canciones']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );

  }
   /**
   * Funcion que sube los datos de una cancion al sistema.
   * E: objeto cancion
   * S: error.
   * SQL:
   */
//save - create
subir(cancion: Cancion): Observable<any>{
  return this.http.post<any>(this.urlEndPoint, cancion, { headers: this.agregarAuthorizationHeader()} ).pipe(
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

   /**
   * Funcion que updatea los datos de una cancion al sistema.
   * E: objeto cancion
   * S: error.
   * SQL:
   */
//save - update
update(cancion: Cancion): Observable <any>{
  return this.http.put<any>(`${this.urlEndPoint}/${cancion.id}`,cancion, { headers: this.agregarAuthorizationHeader()}).pipe(
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

   /**
   * Funcion que borra los datos de una cancion al sistema.
   * E: id buscado
   * S: error.
   * SQL:
   */
//delete
delete(id: number): Observable<Cancion>{
  return this.http.delete<Cancion>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader()}).pipe(
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
