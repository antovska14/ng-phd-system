import { HttpResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RestService } from '../services/rest.service';
import { UserAuth, User, ServiceInjector } from '../classes';
import { RoutePath } from '../enums';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
    private readonly _endpoint = 'auth';
    private readonly _route: Router = ServiceInjector.injector.get(Router);

    public setPassword(password: string) {
        const payload = { userId: this.shared.currentUser.id, password: password };

        return this.post(`${this._endpoint}/setPassword`, payload, {});
    }

    public login(user: User): Observable<UserAuth> {
        this.resetAuthObject();

        return this.post(`${this._endpoint}/login`, user, {}).pipe(
            map((res: HttpResponse<UserAuth>) => {
                const result = res.body;
                Object.assign(this.shared.currentUser, result);
                this.shared.currentUser.id = +this.shared.currentUser.id;
                localStorage.setItem('bearerToken', this.shared.currentUser.bearerToken);

                return result;
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

    public resetAuthObject(): void {
        this.shared.currentUser.id = 0;
        this.shared.currentUser.email = '';
        this.shared.currentUser.bearerToken = '';
        this.shared.currentUser.isAuthenticated = false;
        this.shared.currentUser.role = null;
        this.shared.currentUser.passwordSet = false;

        localStorage.removeItem('bearerToken');
    }
}
