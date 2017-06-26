import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from "app/shared/user.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private user: UserService, private router: Router) { }

    canActivate() {
        debugger;
        if (this.user.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['login']);
        }

    }
}