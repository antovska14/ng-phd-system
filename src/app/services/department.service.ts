import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IDepartment } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends RestService {
    private readonly _endpoint: string = 'departments';

    public getDepartments(facultyId: number): Observable<IDepartment[]> {
        return this.get(`${this._endpoint}/${facultyId}`, {});
    }
}
