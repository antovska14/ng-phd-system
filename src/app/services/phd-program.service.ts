import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IPhdProgram } from '../interfaces';
import { InterceptorEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class PhdProgramService extends RestService {
    private readonly _endpoint: string = 'phdPrograms';

    public getPhdPrograms(professionalFieldId?: number): Observable<IPhdProgram[]> {
        const baseUrl = this._endpoint;
        const url = professionalFieldId ? `${baseUrl}/${professionalFieldId}` : baseUrl;

        return this.get(url, { interceptor: InterceptorEnum.ignoreError }).pipe(
            map((res: HttpResponse<IPhdProgram[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public addPhdProgram(phdProgram: IPhdProgram): Observable<void> {
        const payload = { id: phdProgram.id, name: phdProgram.name, professionalFieldId: phdProgram.professionalField.id };

        return this.post(`${this._endpoint}`, payload, { interceptor: InterceptorEnum.ignoreError }).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
