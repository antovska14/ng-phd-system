import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IPhdProgram } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class PhdProgramService extends RestService {
    private readonly _endpoint: string = 'phdPrograms';

    public getPhdPrograms(professionalFieldId?: number): Observable<IPhdProgram[]> {
        const baseUrl = this._endpoint;
        const url = professionalFieldId ? `${baseUrl}/${professionalFieldId}` : baseUrl;

        return this.get(url, {});
    }

    public addPhdProgram(phdProgram: IPhdProgram): Observable<void> {
        const payload = { id: phdProgram.id, name: phdProgram.name, professionalFieldId: phdProgram.professionalField.id };

        return this.post(`${this._endpoint}`, payload, {});
    }
}
