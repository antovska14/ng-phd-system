import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IProfessionalField } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ProfessionalFieldService extends RestService {
    private readonly _endpoint: string = 'professionalFields';

    public getProfessionalFields(): Observable<IProfessionalField[]> {
        return this.get(`${this._endpoint}`, {});
    }

    public addProfessionalField(professionalField: IProfessionalField): Observable<void> {
        return this.post(`${this._endpoint}`, professionalField, {});
    }
}
