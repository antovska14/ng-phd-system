import { IStudent } from '../student/student.interface';

export interface IStudentDetailsFormConfig {
    student: IStudent;
    editMode: boolean;
    addMode: boolean;
    submitFunction: () => void;
}
