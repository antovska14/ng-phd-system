import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { ITeacher } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class TeacherService extends RestService {
    private readonly _endpoint: string = 'teachers';

    public createTeacher(teacher: ITeacher): Observable<void> {
        return this.post(`${this._endpoint}`, teacher, {});
    }

    public getTeachers(): Observable<ITeacher[]> {
        return this.get(`${this._endpoint}`, {});
    }

    public getTeacher(teacherId: number): Observable<ITeacher> {
        return this.get(`${this._endpoint}/${teacherId}`, {});
    }

    public updateTeacher(teacher: ITeacher): Observable<void> {
        return this.put(`${this._endpoint}`, teacher, {});
    }

    public deleteTeacher(teacherId: number): Observable<void> {
        return this.delete(`${this._endpoint}/${teacherId}`, {});
    }
}