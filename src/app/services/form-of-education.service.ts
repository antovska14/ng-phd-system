import { RestService } from './rest.service';
import { IFormOfEducation } from '../interfaces/student-details/form-of-education.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormOfEducationService extends RestService {
    private readonly _endpoint: string = 'educationForms';

    public getFormsOfEducation(): Observable<IFormOfEducation[]> {
        return this.get(`${this._endpoint}`, {});
    }
}
