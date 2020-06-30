import { ITeacher } from './teacher.interface';

export interface ITeacherDetailsFormConfig {
    teacher: ITeacher;
    editMode: boolean;
    addMode: boolean;
    submitFunction: () => void;
}
