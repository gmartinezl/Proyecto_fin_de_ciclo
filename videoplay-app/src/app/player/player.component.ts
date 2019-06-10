import { Component, OnInit } from "@angular/core";
//import { PlayerService } from './player.service';
import { Cancion } from '../canciones/cancion';
import { $ } from 'protractor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CANCION } from './pista.json';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    
})

export class PlayerComponent implements OnInit{

    pistas: Cancion[];
    paused: boolean = true;
    audio = new Audio();

    constructor(private http: HttpClient/*private playerService: PlayerService*/){}
    ngOnInit(): void {
      /* this.playerService.getCanciones().subscribe(
           pistas => this.pistas = pistas
       );*/
        this.pistas = CANCION;
        console.log(this.pistas);
    }
    
    play(): void{
        this.paused = false;
       
        for(let i = 0; i < this.pistas.length; i++){
            this.audio.src =this.pistas[i].titulo;
            this.audio.load();
            this.audio.play();
        }
       
        
    }
   

    pause(): void{
        this.paused = true;
        this.audio.pause();
    }
   
}