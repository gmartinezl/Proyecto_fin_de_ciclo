import { Component } from "@angular/core";
import { AuthService } from '../usuarios/usuarios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    title: string = 'VideoPlay!';

    constructor(private authService: AuthService, private router: Router){}

    /**
     * Metodo para cerrar sesión a través del servicio oauth
     * E:
     * S:
     * SQL:
     */
    logout():void{
        let username = this.authService.usuario.username;
        this.authService.logout();
        Swal.fire('Logout',`${username}, has cerrado sesión con éxito`,'success');
        this.router.navigate(['/login']);
    }
}

