import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './usuarios/login/login.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CancionesComponent } from './canciones/canciones.component';
import { RegistroComponent } from './registro/registro.component';

//constante con todas las rutas de nuestra app.
const routes: Routes = [
  {path: '' ,redirectTo:'/inicio', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'inicio', component: PlayerComponent},
  {path: 'registro', component: RegistroComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent,
    LoginComponent,
    NoticiasComponent,
    FavoritosComponent,
    CancionesComponent,
    RegistroComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
