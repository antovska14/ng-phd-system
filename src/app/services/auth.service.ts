import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from '../services/rest.service';
import { UserAuth, User } from '../classes/security';
import { BaseEndpointsEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
    private readonly _endpoint = 'auth';

    public readonly authObject: UserAuth = new UserAuth();

    public login(user: User): Observable<UserAuth> {
        this.resetAuthObject();

        return this.post(`${this._endpoint}/login`, user, { baseEndPoint: BaseEndpointsEnum.PhDSystemApi }).pipe(
            map((res: HttpResponse<UserAuth>) => {
                return res.body;
            }),
            tap((res: UserAuth) => {
                Object.assign(this.authObject, res);
                localStorage.setItem('bearerToken', this.authObject.bearerToken);
            })
        );
    }

    public logout(): void {
        this.resetAuthObject();
    }

    public resetAuthObject(): void {
        this.authObject.userName = '';
        this.authObject.bearerToken = '';
        this.authObject.canAccessStudents = false;
        this.authObject.canAccessSupervisors = false;
        this.authObject.canAddStudent = false;
        this.authObject.canAccessSupervisors = false;
        this.authObject.canDeleteStudent = false;
        this.authObject.canDeleteSupervisor = false;

        localStorage.removeItem('bearerToken');
    }
}
