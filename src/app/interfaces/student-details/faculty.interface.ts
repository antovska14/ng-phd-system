import { IUniversity } from './university.interface';

export interface IFaculty {
    id: number;
    university: IUniversity;
    name: string;
}
