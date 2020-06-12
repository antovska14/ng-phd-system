import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RestService } from '../services/rest.service';
import { AppUserAuth, AppUser, LOGIN_MOCKS } from '../classes/security';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
    public authObject: AppUserAuth = new AppUserAuth();

    public login(appUser: AppUser): Observable<AppUserAuth> {
        this.resetAuthObject();

        Object.assign(
            this.authObject,
            LOGIN_MOCKS.find((user) => user.userName.toLowerCase() === appUser.userName.toLowerCase())
        );

        if (this.authObject) {
            localStorage.setItem('bearerToken', this.authObject.bearerToken);
        }

        return of<AppUserAuth>(this.authObject);
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
