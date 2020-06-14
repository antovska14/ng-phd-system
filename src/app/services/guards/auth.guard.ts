import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedDataService } from '../shared-data.service';
import { ServiceInjector } from 'src/app/classes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private readonly _shared: SharedDataService;

    constructor(private readonly _router: Router) {
        this._shared = ServiceInjector.injector.get(SharedDataService);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._shared.currentUser.isAuthenticated) {
            return true;
        } else {
            this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
