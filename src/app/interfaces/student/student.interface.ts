import { ITeacher } from '../teacher.interface';

export interface IStudent {
    id: number;
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    formOfEducationId: number;
    currentYear: number;
    specialty: string;
    facultyCouncilChosenDate: Date;
    teachers: ITeacher[];
}
