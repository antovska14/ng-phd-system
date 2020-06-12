import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let claimType: string = next.data['claimType'];
        if (this._authService.authObject.isAuthenticated && this._authService.authObject[claimType]) {
            return true;
        } else {
            this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}