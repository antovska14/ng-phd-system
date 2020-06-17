import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/student.interface';

@Injectable({ providedIn: 'root' })
export class StudentService extends RestService {
    private readonly _endpoint: string = 'students';

    public getStudents(): Observable<IStudent[]> {
        return this.get(`${this._endpoint}`, {});
    }

    public getStudent(studentId: number): Observable<IStudent> {
        return this.get(`${this._endpoint}/${studentId}`, {});
    }
}
