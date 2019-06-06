import { Component, OnInit } from "@angular/core";
//import { PlayerService } from './player.service';
import { Cancion } from '../canciones/cancion';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    
})

export class PlayerComponent implements OnInit{

    pistas: Cancion[];

    constructor(/*private playerService: PlayerService*/){}
    ngOnInit(): void {
      /* this.playerService.getCanciones().subscribe(
           pistas => this.pistas = pistas
       );*/
    }
   
}