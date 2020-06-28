import { ITeacher, IProfessionalField, IPhdProgram, IUniversity, IFaculty, IDepartment, IFormOfEducation } from 'src/app/interfaces';
import { FormOfEducation, PhdProgram, ProfessionalField, Department, Faculty, University } from './student-details';

export class Student {
    public readonly id: number;
    public readonly userId: number;
    public readonly firstName: string = '';
    public readonly middleName: string = '';
    public readonly lastName: string = '';
    public readonly email: string = '';
    public readonly specialty: string = '';
    public readonly formOfEducation: IFormOfEducation = new FormOfEducation();
    public readonly currentYear: number;
    public readonly facultyCouncilChosenDate: Date = new Date();
    public readonly phdProgram: IPhdProgram = new PhdProgram();
    public readonly professionalField: IProfessionalField = new ProfessionalField();
    public readonly startDate: Date = new Date();
    public readonly endDate: Date = new Date();
    public readonly department: IDepartment = new Department();
    public readonly faculty: IFaculty = new Faculty();
    public readonly university: IUniversity = new University();
    public readonly dissertationTheme: string = '';
    public readonly teachers: ITeacher[] = [];
}
