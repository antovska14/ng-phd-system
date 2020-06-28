import { Injectable } from '@angular/core';

import { UserAuth } from '../classes';

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    currentUser: UserAuth;
}
