import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SharedDataService } from './shared-data.service';
import { ServiceInjector } from '../classes';
import { UserAuth } from '../classes/security';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private readonly _jwtHelperService: JwtHelperService = new JwtHelperService();

    public init(): void {
        let sharedService: SharedDataService = ServiceInjector.injector.get(SharedDataService);
        sharedService.currentUser = new UserAuth();
        const bearerToken = localStorage.getItem('bearerToken');
        if (bearerToken) {
            const decodedBearerToken = this._jwtHelperService.decodeToken(bearerToken);
            sharedService.currentUser.userName = decodedBearerToken.userName;
            sharedService.currentUser.isAuthenticated = decodedBearerToken.isAuthenticated;
            sharedService.currentUser.role = decodedBearerToken.role;
            sharedService.currentUser.bearerToken = bearerToken;
        }
    }
}
