import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SharedDataService } from './shared-data.service';
import { BaseEndpointsEnum } from '../enums';
import { ServiceInjector } from '../classes';

@Injectable({ providedIn: 'root' })
export class RestService {
    private readonly _defaultBaseEndpoint = environment.phdApiUrl;
    private readonly _baseEndpoints: Map<BaseEndpointsEnum, string> = new Map([[BaseEndpointsEnum.PhDSystemApi, environment.phdApiUrl]]);

    public shared: SharedDataService;

    constructor(private readonly _http: HttpClient) {
        this.shared = ServiceInjector.injector.get(SharedDataService);
    }

    protected get(url: string, options: IRestGetOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        switch (options.responseType) {
            case 'blob':
                return this._http.get(preparedUrl, {
                    headers: preparedHeaders,
                    observe: options.observe,
                    responseType: 'blob',
                    params: options.params,
                });
            default:
                return this._http.get(preparedUrl, {
                    headers: preparedHeaders,
                    observe: options.observe,
                    params: options.params,
                });
        }
    }

    protected post(url: string, payload: object, options: IRestCallOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        return this._http.post(preparedUrl, payload, {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        });
    }

    protected put(url: string, payload: object, options: IRestCallOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        return this._http.put(preparedUrl, payload, {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        });
    }

    protected delete(url: string, options: IRestDeleteOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        return this._http.delete(preparedUrl, {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        });
    }

    protected postFile(url: string, payload: object, options: IRestPostFileOptions): Observable<HttpEvent<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers, options.skipContentType);

        return this._http.post(preparedUrl, payload, {
            headers: preparedHeaders,
            observe: 'events',
            params: options.params,
        });
    }

    private prepareUrl(url: string, baseEndPoint: BaseEndpointsEnum) {
        let baseEndpointValue: string = this._baseEndpoints.get(baseEndPoint);

        return baseEndpointValue ? baseEndpointValue + url : this._defaultBaseEndpoint + url;
    }

    private getHeaders(headers: HttpHeaders, skipContentType?: boolean): HttpHeaders {
        headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.shared?.currentUser?.bearerToken);
        if (skipContentType) {
            return headers;
        }

        return headers.set('Content-Type', 'application/json');
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

export interface IRestPostFileOptions extends IRestCallOptions {
    reportProgress?: boolean;
    skipContentType?: boolean;
}
