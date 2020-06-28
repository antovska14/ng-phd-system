import { IExam } from './';

export interface IExamYearDetails {
    studentId: number;
    year: number;
    exams: IExam[];
}
