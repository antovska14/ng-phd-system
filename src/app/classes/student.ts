import { ITeacher } from 'src/app/interfaces';

export class Student {
    public readonly id: number;
    public readonly userId: number;
    public readonly firstName: string;
    public readonly middleName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly formOfEducationId: number;
    public readonly currentYear: number;
    public readonly specialty: string;
    public readonly facultyCouncilChosenDate: Date;
    public readonly teachers: ITeacher[];
}
