import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { BaseEndpointsEnum } from '../enums';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IFile } from '../interfaces';

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
