import { Injectable } from '@angular/core';

import { UserAuth } from '../classes';
import { IUserRoleConfig } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    currentUser: UserAuth;
    userRoleConfig: IUserRoleConfig;
}
