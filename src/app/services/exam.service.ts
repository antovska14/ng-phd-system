import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { IExam, IExamYearDetails } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ExamService extends RestService {
    private readonly _endpoint: string = 'exams';

    public getExams(studentId: number): Observable<IExamYearDetails[]> {
        return this.get(`${this._endpoint}/${studentId}`, {});
    }

    public addExam(exam: IExam): Observable<void> {
        return this.post(`${this._endpoint}`, exam, {});
    }

    public deleteExam(examId: number): Observable<void> {
        return this.delete(`${this._endpoint}/${examId}`, {});
    }
}
