import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { ITeacher } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class TeacherService extends RestService {
    private readonly _endpoint: string = 'teachers';

    public createTeacher(teacher: ITeacher): Observable<void> {
        return this.post(`${this._endpoint}`, teacher, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public getTeachers(): Observable<ITeacher[]> {
        return this.get(`${this._endpoint}`, {}).pipe(
            map((res: HttpResponse<ITeacher[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public getTeacher(teacherId: number): Observable<ITeacher> {
        return this.get(`${this._endpoint}/${teacherId}`, {}).pipe(
            map((res: HttpResponse<ITeacher>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public updateTeacher(teacher: ITeacher): Observable<void> {
        return this.put(`${this._endpoint}`, teacher, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public deleteTeacher(teacherId: number): Observable<void> {
        return this.delete(`${this._endpoint}/${teacherId}`, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
