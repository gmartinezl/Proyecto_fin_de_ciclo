import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
    router: any;
    private isNotAuthorized(e): boolean{

        if(e.status == 401 || e.status == 403){
            this.router.navigate(['/login'])
            return true;
        }
        return false;

    }

    public viewFavList(): void{

    }
}