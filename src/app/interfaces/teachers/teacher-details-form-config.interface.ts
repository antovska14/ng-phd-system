import { ITeacher } from './teacher.interface';

export interface ITeacherDetailsFormConfig {
    student: ITeacher;
    editMode: boolean;
    addMode: boolean;
    submitFunction: () => void;
}
