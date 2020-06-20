import { HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IFile, IExportStudentFileRequest, IStudentFileRequest, IUploadStudentFileRequest } from '../interfaces';
import { RestService } from './rest.service';
import { StudentFileType } from '../enums';

@Injectable({ providedIn: 'root' })
export class StudentFileService extends RestService {
    private readonly _endpoint = 'studentFiles';

    public deleteStudentFile(studentFile: IStudentFileRequest): Observable<void> {
        const payload = { fileName: studentFile.fileName };
        const url: string = this.getStudentFileUrl(`${this._endpoint}/delete/${studentFile.studentId}`, studentFile.year);
        return this.delete(url, { body: payload });
    }

    public downloadStudentFile(studentFile: IStudentFileRequest): Observable<IFile> {
        const payload = { fileName: studentFile.fileName };
        const url: string = this.getStudentFileUrl(`${this._endpoint}/download/${studentFile.studentId}`, studentFile.year);
        return this.delete(url, { body: payload }).pipe(
            map((res: Blob) => {
                const result: IFile = {
                    fileName: studentFile.fileName,
                    fileContent: res,
                };

                return result;
            })
        );
    }

    public exportStudentFile(studentFile: IExportStudentFileRequest): Observable<IFile> {
        const url = this.getStudentFileUrl(`${this._endpoint}/export/${studentFile.studentId}/${studentFile.studentFileType}`, studentFile.year);
        return this.get(`${url}`, { responseType: 'blob' }).pipe(
            map((res: Blob) => {
                const fileName = this.getFileName(studentFile.studentFileType);
                const result: IFile = {
                    fileName: fileName,
                    fileContent: res,
                };

                return result;
            })
        );
    }

    public uploadStudentFile(studentFile: IUploadStudentFileRequest): Observable<HttpEvent<any>> {
        const payload: FormData = this.getUploadFilePayload('fileUploadKey', studentFile.file);
        const url: string = this.getStudentFileUrl(`${this._endpoint}/upload/${studentFile.studentId}`, studentFile.year);
        return this.postFile(url, payload, { reportProgress: true });
    }

    private getStudentFileUrl(baseUrl: string, year: number): string {
        return year ? baseUrl + '/year' : baseUrl;
    }

    private getFileName(studentFileType: StudentFileType): string {
        switch (studentFileType) {
            case StudentFileType.individualPlan:
                return 'IndividualPlan.docx';
            case StudentFileType.annotation:
                return 'Annotation.docx';
            case StudentFileType.attestation:
                return 'Attestation.docx';
            default:
                return 'UnexpectedFileType.docx';
        }
    }

    private getUploadFilePayload(key: string, file: File): FormData {
        let payload: FormData = new FormData();
        payload.append(key, file, file.name);
        return payload;
    }
}
