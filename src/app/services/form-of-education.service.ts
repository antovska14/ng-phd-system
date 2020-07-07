import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RestService } from './rest.service';
import { IFormOfEducation } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class FormOfEducationService extends RestService {
    private readonly _endpoint: string = 'educationForms';

    public getFormsOfEducation(): Observable<IFormOfEducation[]> {
        return this.get(`${this._endpoint}`, {}).pipe(
            map((res: HttpResponse<IFormOfEducation[]>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
