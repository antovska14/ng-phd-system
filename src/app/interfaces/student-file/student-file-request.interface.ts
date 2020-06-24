import { StudentFileType } from '../../enums';

export interface IStudentFileRequestBase {
    studentId: number;
    year?: number;
}

export interface IStudentFileRequest extends IStudentFileRequestBase {
    fileName: string;
}

export interface IExportStudentFileRequest extends IStudentFileRequestBase {
    studentFileType: StudentFileType;
}

export interface IUploadStudentFileRequest extends IStudentFileRequestBase {
    file: File;
}
