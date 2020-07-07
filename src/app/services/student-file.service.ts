import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import { StudentFileType } from '../enums';
import {
    IFile,
    IExportStudentFileRequest,
    IStudentFileRequest,
    IUploadStudentFileRequest,
    IStudentFileGroupDetails,
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class StudentFileService extends RestService {
    private readonly _endpoint = 'studentFiles';

    public deleteStudentFile(studentFile: IStudentFileRequest): Observable<void> {
        const payload = { fileName: studentFile.fileName };
        const url: string = this.getStudentFileUrl(`${this._endpoint}/delete/${studentFile.studentId}`, studentFile.year);
        return this.post(url, payload, {}).pipe(
            map((res: HttpResponse<any>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public downloadStudentFile(studentFile: IStudentFileRequest): Observable<IFile> {
        const payload = { fileName: studentFile.fileName };
        const url: string = this.getStudentFileUrl(`${this._endpoint}/download/${studentFile.studentId}`, studentFile.year);
        return this.post(url, payload, { responseType: 'blob' }).pipe(
            map((res: HttpResponse<Blob>) => {
                const result: IFile = {
                    fileName: studentFile.fileName,
                    fileContent: res.body,
                };

                return result;
            })
        );
    }

    public getStudentFileDetails(studentId: number): Observable<IStudentFileGroupDetails[]> {
        return this.get(`${this._endpoint}/${studentId}`, {}).pipe(
            map((res: HttpResponse<IStudentFileGroupDetails[]>) => {
                const result = res.body;
                return result;
            })
        );
    }

    public exportStudentFile(studentFile: IExportStudentFileRequest): Observable<IFile> {
        const url = this.getStudentFileUrl(
            `phdFiles/generate/${studentFile.studentId}/${studentFile.studentFileType}`,
            studentFile.year
        );
        return this.get(`${url}`, { responseType: 'blob' }).pipe(
            map((res: HttpResponse<Blob>) => {
                const fileName = this.getFileName(studentFile.studentFileType);
                const result: IFile = {
                    fileName: fileName,
                    fileContent: res.body,
                };

                return result;
            })
        );
    }

    public uploadStudentFile(studentFile: IUploadStudentFileRequest): Observable<HttpEvent<any>> {
        const payload: FormData = this.getUploadFilePayload('fileUploadKey', studentFile.file);
        const url: string = this.getStudentFileUrl(`${this._endpoint}/upload/${studentFile.studentId}`, studentFile.year);
        return this.postFile(url, payload, { reportProgress: true, skipContentType: true });
    }

    private getStudentFileUrl(baseUrl: string, year: number): string {
        return year ? baseUrl + `/${year}` : baseUrl;
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
