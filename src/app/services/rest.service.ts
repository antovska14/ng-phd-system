import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BaseEndpointsEnum } from '../enums';

@Injectable({ providedIn: 'root' })
export class RestService {
    private readonly _defaultBaseEndpoint = environment.phdApiUrl;
    private readonly _baseEndpoints: Map<BaseEndpointsEnum, string> = new Map([[BaseEndpointsEnum.PhDSystemApi, environment.phdApiUrl]]);

    constructor(private readonly _http: HttpClient) {}

    protected get(url: string, options: IRestGetOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);

        switch (options.responseType) {
            case 'blob':
                return this._http.get(preparedUrl, { headers: options.headers, params: options.params, observe: options.observe, responseType: 'blob' });

            default:
                return this._http.get(preparedUrl, { headers: options.headers, params: options.params, observe: options.observe });
        }
    }

    protected post(url: string, payload: object, options: IRestCallOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedOptions = { headers: options.headers, params: options.params, observe: options.observe };

        return this._http.post(preparedUrl, payload, preparedOptions);
    }

    protected put(url: string, payload: object, options: IRestCallOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedOptions = { headers: options.headers, params: options.params, observe: options.observe };

        return this._http.put(preparedUrl, payload, preparedOptions);
    }

    protected delete(url: string, options: IRestDeleteOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedOptions = { headers: options.headers, params: options.params, observe: options.observe };

        return this._http.delete(preparedUrl, preparedOptions);
    }

    private prepareUrl(url: string, baseEndPoint: BaseEndpointsEnum) {
        let baseEndpointValue: string = this._baseEndpoints.get(baseEndPoint);

        return baseEndpointValue ? baseEndpointValue + url : this._defaultBaseEndpoint + url;
    }
}

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
