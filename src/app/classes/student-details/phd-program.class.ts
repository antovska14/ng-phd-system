import { IProfessionalField } from 'src/app/interfaces';
import { ProfessionalField } from './professional-field.class';

export class PhdProgram {
    public readonly id: number;
    public readonly professionalField: IProfessionalField = new ProfessionalField();
    public readonly name: string;
}
