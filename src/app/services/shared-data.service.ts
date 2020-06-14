import { Injectable } from '@angular/core';
import { UserAuth } from '../classes/security';

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    currentUser: UserAuth;
}
