import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IUniversity } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UniversityService extends RestService {
    private readonly _endpoint: string = 'universities';

    public getUniversities(): Observable<IUniversity[]> {
        return this.get(`${this._endpoint}`, {});
    }
}
