import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from './rest.service';
import { BaseEndpointsEnum } from '../enums';
import { HttpResponse, HttpEvent } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExportService extends RestService {
    public exportFile(): Observable<Blob> {
        return this.get('documents/export', { responseType: 'blob' }).pipe(
            map((res: Blob) => {
                return res;
            })
        );
    }

    public uploadFile(file: File): Observable<HttpEvent<any>> {
        let payload: FormData = new FormData();
        payload.append('uploadFileKey', file, file.name);
        return this.postFile('documents/upload', payload, { reportProgress: true });
    }

    public studentFileUpload(studentId: number, file: File): Observable<HttpEvent<any>> {
        let payload: FormData = new FormData();
        payload.append('uploadFileKey', file, file.name);
        return this.postFile('documents/upload/' + studentId, payload, { reportProgress: true });
    }

    public deleteStudentFile(studentId: number, fileName: string): Observable<void> {
        return this.delete('documents/delete/' + studentId, { body: { fileName: fileName } });
    }
}
