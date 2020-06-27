import { ITeacher, IProfessionalField, IPhdProgram, IUniversity, IFaculty, IDepartment, IFormOfEducation } from 'src/app/interfaces';

export class Student {
    public readonly id: number;
    public readonly userId: number;
    public readonly firstName: string;
    public readonly middleName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly specialty: string;
    public readonly formOfEducation: IFormOfEducation;
    public readonly currentYear: number;
    public readonly facultyCouncilChosenDate: Date;
    public readonly phdProgram: IPhdProgram;
    public readonly startDate: Date;
    public readonly endDate: Date;
    public readonly department: IDepartment;
    public readonly dissertationTheme: string;
    public readonly teachers: ITeacher[];
}
