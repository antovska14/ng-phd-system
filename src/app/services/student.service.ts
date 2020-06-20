import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IStudent } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class StudentService extends RestService {
    private readonly _endpoint: string = 'students';

    public getStudents(): Observable<IStudent[]> {
        return this.get(`${this._endpoint}`, {});
    }

    public getStudent(studentId: number): Observable<IStudent> {
        return this.get(`${this._endpoint}/${studentId}`, {});
    }

    public createStudent(student: IStudent): Observable<void> {
        return this.post(`${this._endpoint}`, student, {});
    }

    public updateStudent(student: IStudent): Observable<void> {
        return this.put(`${this._endpoint}`, student, {});
    }

    public deleteStudent(studentId: number): Observable<void> {
        return this.delete(`${this._endpoint}/${studentId}`, {});
    }
}
