export interface IExam {
    id: number;
    studentId: number;
    year: number;
    name: string;
    grade: number;
    date: Date;

    toString(): string;
}
