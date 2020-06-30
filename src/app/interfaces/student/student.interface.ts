import { IDepartment, IPhdProgram, IUniversity, IFaculty, IProfessionalField, IFormOfEducation } from '../student-details';
import { ITeacher } from '..';

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
    professionalField: IProfessionalField;
    startDate: Date;
    endDate: Date;
    department: IDepartment;
    faculty: IFaculty;
    university: IUniversity;
    dissertationTheme: string;
    teachers: ITeacher[];
}
