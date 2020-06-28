import { IFaculty } from 'src/app/interfaces';

export class Department {
    public readonly id: number;
    public readonly faculty: IFaculty;
    public readonly name: string;
}
