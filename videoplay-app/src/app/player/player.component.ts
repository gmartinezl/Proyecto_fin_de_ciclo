import { Component, OnInit } from "@angular/core";
//import { PlayerService } from './player.service';
import { Cancion } from '../canciones/cancion';
import { $ } from 'protractor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CANCION } from './pista.json';
import { Howl, Howler } from 'howler';
import { SourceNode } from 'source-list-map';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
    
})

export class PlayerComponent implements OnInit{

    pistas: Cancion[];
    paused: boolean = true;
    sound: Howl;
    titulo ;
    i: number ;
   


    constructor(private http: HttpClient/*private playerService: PlayerService*/){}
    ngOnInit(): void {
      /* this.playerService.getCanciones().subscribe(
           pistas => this.pistas = pistas
       );*/
        this.pistas = CANCION;
        console.log(this.pistas);
        console.log(this.pistas.length);
        //this.playList(0,this.pistas);
        this.i = 0;
        this.playList(this.i);
        
    }
    
    playList(i: number){
        this.sound = new Howl({
            src: [this.pistas[i].titulo]
        })
        this.sound.once('end', ()=>{
            this.playList(i+1);
            this.mostrarCancion(i+1);
            this.sound.play();
            this.i = this.i+1;
            
        });
    }

    play(): void{
        
        this.paused = false;
        if(this.i == 0){
            this.mostrarCancion(this.i);
        } 
        
        this.sound.play();
    }
   
    mostrarCancion(i: number){
       
            this.titulo = 'Titulo: '+ this.pistas[i].artista;
        
       
    }

    pause(): void{
        this.paused = true;
        this.sound.fade(1,0,500);
        this.sound.once('fade', ()=>{
            this.sound.pause();
            this.sound.volume(1);
        });
        

       
    }
   
}