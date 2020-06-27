import { IFaculty } from './faculty.interface';

export interface IDepartment {
    id: number;
    faculty: IFaculty;
    name: string;
}
