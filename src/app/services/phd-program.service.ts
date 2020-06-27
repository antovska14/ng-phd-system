import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IPhdProgram } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class PhdProgramService extends RestService {
    private readonly _endpoint: string = 'phdPrograms';

    public getPhdPrograms(professionalFieldId: number): Observable<IPhdProgram[]> {
        return this.get(`${this._endpoint}/${professionalFieldId}`, {});
    }
}
