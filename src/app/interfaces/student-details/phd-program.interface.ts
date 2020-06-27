import { IProfessionalField } from './professional-field.interface';

export interface IPhdProgram {
    id: number;
    professionalField: IProfessionalField;
    name: string;
}
