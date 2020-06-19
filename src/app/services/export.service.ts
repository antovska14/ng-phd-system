import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from './rest.service';
import { BaseEndpointsEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class ExportService extends RestService {
    public exportFile(): Observable<Blob> {
        return this.get('documents/export', { responseType: 'blob' }).pipe(
            map((res: Blob) => {
                return res;
            })
        );
    }

    public uploadFile(file: File): Observable<void> {
        let payload: FormData = new FormData();
        payload.append('uploadFileKey', file, file.name);
        return this.postFile('documents/upload', payload, { excludeContentType: true });
    }
}
