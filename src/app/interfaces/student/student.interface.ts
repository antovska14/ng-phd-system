import { ITeacher } from '../teacher.interface';
import { IDepartment, IPhdProgram } from '../student-details';
import { IFormOfEducation } from '../student-details/form-of-education.interface';

export interface IStudent {
    id: number;
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    specialty: string;
    formOfEducation: IFormOfEducation;
    currentYear: number;
    facultyCouncilChosenDate: Date;
    phdProgram: IPhdProgram;
    startDate: Date;
    endDate: Date;
    department: IDepartment;
    dissertationTheme: string;
    teachers: ITeacher[];
}
