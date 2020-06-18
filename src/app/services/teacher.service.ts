import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { ITeacher } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class TeacherService extends RestService {
    private readonly _endpoint: string = 'teachers';

    public getTeachers(): Observable<ITeacher[]> {
        return this.get(`${this._endpoint}`, {});
    }
}
