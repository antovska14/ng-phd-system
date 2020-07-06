import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseEndpointsEnum } from '../enums';

export interface IRestCallOptions {
    baseEndPoint?: BaseEndpointsEnum;
    headers?: HttpHeaders;
    observe?: 'response';
    params?: HttpParams | { [param: string]: string | string[] };
}

export interface IRestGetOptions extends IRestCallOptions {
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

export interface IRestDeleteOptions extends IRestCallOptions {
    body?: object;
}

export interface IRestPostOptions extends IRestCallOptions {
    reportProgress?: boolean;
    skipContentType?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
