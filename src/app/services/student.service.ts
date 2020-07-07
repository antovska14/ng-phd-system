import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IStudent, IStudentListModel } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class StudentService extends RestService {
    private readonly _endpoint: string = 'students';

    public getStudents(): Observable<IStudentListModel[]> {
        return this.get(`${this._endpoint}`, {}).pipe(
            map((res: HttpResponse<IStudentListModel[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public getStudentsByTeacherUserId(teacherUserId: number): Observable<IStudentListModel[]> {
        return this.get(`${this._endpoint}/teacher/${teacherUserId}`, {}).pipe(
            map((res: HttpResponse<IStudentListModel[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public getStudent(studentId: number): Observable<IStudent> {
        return this.get(`${this._endpoint}/${studentId}`, {}).pipe(
            map((res: HttpResponse<IStudent>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public createStudent(student: IStudent): Observable<void> {
        return this.post(`${this._endpoint}`, student, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public updateStudent(student: IStudent): Observable<void> {
        return this.put(`${this._endpoint}`, student, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public deleteStudent(studentId: number): Observable<void> {
        return this.delete(`${this._endpoint}/${studentId}`, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }
}
