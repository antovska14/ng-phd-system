import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RestService } from '../services/rest.service';
import { UserAuth, User } from '../classes/security';
import { ServiceInjector } from '../classes';
import { RoutePath } from '../enums';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
    private readonly _endpoint = 'auth';
    private readonly _route: Router = ServiceInjector.injector.get(Router);

    public login(user: User): Observable<UserAuth> {
        this.resetAuthObject();

        return this.post(`${this._endpoint}/login`, user, {}).pipe(
            tap((res: UserAuth) => {
                Object.assign(this.shared.currentUser, res);
                localStorage.setItem('bearerToken', this.shared.currentUser.bearerToken);
            }),
            catchError((e) => {
                console.log(e);
                throw e;
            })
        );
    }

    public logout(): void {
        this.resetAuthObject();
        this._route.navigate([RoutePath.login]);
    }

    public hasRole(role: string): boolean {
        return this.shared.currentUser.role === role;
    }

    public resetAuthObject(): void {
        this.shared.currentUser.id = 0;
        this.shared.currentUser.email = '';
        this.shared.currentUser.bearerToken = '';
        this.shared.currentUser.isAuthenticated = false;
        this.shared.currentUser.role = null;

        localStorage.removeItem('bearerToken');
    }
}
