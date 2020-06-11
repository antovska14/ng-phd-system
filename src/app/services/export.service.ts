import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from './rest.service';
import { BaseEndpointsEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class ExportService extends RestService {
    public exportFile(): Observable<Blob> {
        return this.get('file/export', { baseEndPoint: BaseEndpointsEnum.PhDSystemApi, responseType: 'blob' }).pipe(
            map((res: any) => {
                return res as Blob;
            })
        );
    }
}
