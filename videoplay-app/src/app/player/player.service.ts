/*import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../canciones/cancion';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private urlEndPoint = 'http://localhost:8080/api/player';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  

  constructor(private http: HttpClient) { }

  getCanciones(): Observable <Cancion[]> {
    //return this.http.get <Cancion[]> (this.urlEndPoint, { headers: this.agregarAuthorizationHeader()});
  }
}
*/