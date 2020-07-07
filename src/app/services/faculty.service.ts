import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IFaculty } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class FacultyService extends RestService {
    private readonly _endpoint: string = 'faculties';

    public getFaculties(univeristyId: number): Observable<IFaculty[]> {
        return this.get(`${this._endpoint}/${univeristyId}`, {}).pipe(
            map((res: HttpResponse<IFaculty[]>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
