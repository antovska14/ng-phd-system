import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { SharedDataService } from './shared-data.service';
import { RoleConfigService } from './role-config.service';
import { AuthService } from './auth.service';
import { ServiceInjector } from '../classes';
import { ROLES } from '../shared/const';
import { UserAuth } from '../classes';
import { IUserRoleConfig } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private readonly _jwtHelperService: JwtHelperService = new JwtHelperService();
    private _authService: AuthService;
    private _sharedService: SharedDataService;
    private _userRoleConfigService: RoleConfigService;

    public init() {
        this._sharedService = ServiceInjector.injector.get(SharedDataService);

        return new Promise((resolve, reject) => {
            this._sharedService.currentUser = new UserAuth();

            this.loadJwt()
                .then(() => {
                    // logout if expired
                    const nowDate = Date.now() / 1000;
                    const tokenExpired: boolean = this._sharedService.currentUser.exp < nowDate;
                    if (tokenExpired) {
                        this._authService = ServiceInjector.injector.get(AuthService);
                        this._authService.logout();
                    }

                    if (this._sharedService.currentUser.id) {
                        this.initRoleConfig()
                            .then(() => {
                                resolve(true);
                            })
                            .catch(() => {
                                console.log('ERROR LOADING ROLE CONFIG');
                            });
                    } else {
                        resolve(true);
                    }
                })
                .catch(() => {
                    console.log('ERROR LOADING JWT');
                });
        });
    }

    private loadJwt(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const bearerToken = localStorage.getItem('bearerToken');

            if (bearerToken) {
                const decodedBearerToken = this._jwtHelperService.decodeToken(bearerToken);
                this._sharedService.currentUser.id = +decodedBearerToken.id;
                this._sharedService.currentUser.email = decodedBearerToken.email;
                this._sharedService.currentUser.isAuthenticated = decodedBearerToken.isAuthenticated;
                this._sharedService.currentUser.role = decodedBearerToken.role;
                this._sharedService.currentUser.passwordSet = decodedBearerToken.passwordSet;
                this._sharedService.currentUser.bearerToken = bearerToken;
                this._sharedService.currentUser.exp = decodedBearerToken.exp;
            }

            resolve(true);
        });
    }

    private initRoleConfig(): Promise<boolean> {
        this._userRoleConfigService = ServiceInjector.injector.get(RoleConfigService);
        return new Promise((resolve, reject) => {
            this._userRoleConfigService
                .getRoleConfigFn(this._sharedService.currentUser.role, this._sharedService.currentUser.id)
                .subscribe(
                    (res: IUserRoleConfig) => {
                        this._sharedService.userRoleConfig = res;
                    },
                    () => {
                        resolve(true);
                    },
                    () => {
                        resolve(true);
                    }
                );
        });
    }
}
