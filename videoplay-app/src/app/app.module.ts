import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './usuarios/login/login.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CancionesComponent } from './canciones/canciones.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { CancionService } from './canciones/cancion.service';
import { CancionesformComponent } from './canciones/cancionesform.component';


// constante con todas las rutas de nuestra app.
const routes: Routes = [
  {path: '' , redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'inicio', component: PlayerComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'canciones', component: CancionesComponent},
  {path: 'canciones/cancionesform', component: CancionesformComponent}, 
  {path: 'canciones/cancionesform/:id', component: CancionesformComponent}
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
    UsuariosComponent,
    CancionesformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
   
  ],
  providers: [UsuarioService,CancionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
