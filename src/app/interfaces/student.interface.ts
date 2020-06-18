import { ITeacher } from './teacher.interface';

export interface IStudent {
    id: number;
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    formOfEducation: string;
    currentYear: number;
    specialtyName: string;
    facultyCouncilChosenDate: Date;
    teachers: ITeacher[];
}
