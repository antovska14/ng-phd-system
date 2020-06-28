import { IStudent } from '../student/student.interface';

export interface IDetailsFormConfig {
    student: IStudent;
    editMode: boolean;
    addMode: boolean;
    submitFunction: () => void;
}
