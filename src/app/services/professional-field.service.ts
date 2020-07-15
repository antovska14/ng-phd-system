import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IProfessionalField } from '../interfaces';
import { InterceptorEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class ProfessionalFieldService extends RestService {
    private readonly _endpoint: string = 'professionalFields';

    public getProfessionalFields(): Observable<IProfessionalField[]> {
        return this.get(`${this._endpoint}`, { interceptor: InterceptorEnum.ignoreError }).pipe(
            map((res: HttpResponse<IProfessionalField[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public addProfessionalField(professionalField: IProfessionalField): Observable<void> {
        return this.post(`${this._endpoint}`, professionalField, { interceptor: InterceptorEnum.ignoreError }).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
