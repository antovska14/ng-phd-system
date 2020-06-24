import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SharedDataService } from './shared-data.service';
import { ServiceInjector } from '../classes';
import { UserAuth } from '../classes/security';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private readonly _jwtHelperService: JwtHelperService = new JwtHelperService();
    private authService: AuthService;

    public init(): void {
        let sharedService: SharedDataService = ServiceInjector.injector.get(SharedDataService);
        sharedService.currentUser = new UserAuth();
        const bearerToken = localStorage.getItem('bearerToken');

        if (bearerToken) {
            const decodedBearerToken = this._jwtHelperService.decodeToken(bearerToken);
            sharedService.currentUser.id = decodedBearerToken.id;
            sharedService.currentUser.email = decodedBearerToken.email;
            sharedService.currentUser.isAuthenticated = decodedBearerToken.isAuthenticated;
            sharedService.currentUser.role = decodedBearerToken.role;
            sharedService.currentUser.bearerToken = bearerToken;
            sharedService.currentUser.exp = decodedBearerToken.exp;
        }

        const nowDate = Date.now() / 1000;
        const tokenExpired: boolean = sharedService.currentUser.exp < nowDate;
        if (tokenExpired) {
            this.authService = ServiceInjector.injector.get(AuthService);
            this.authService.logout();
        }
    }
}
