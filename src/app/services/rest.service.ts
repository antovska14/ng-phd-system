import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BaseEndpointsEnum } from '../enums';
import { SharedDataService } from './shared-data.service';
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
        const preparedOptions = {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        };

        const obs = this._http.post(preparedUrl, payload, preparedOptions);
        return obs;
    }

    protected put(url: string, payload: object, options: IRestCallOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        const preparedOptions = {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        };

        return this._http.put(preparedUrl, payload, preparedOptions);
    }

    protected delete(url: string, options: IRestDeleteOptions): Observable<any> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);

        const preparedOptions = {
            headers: preparedHeaders,
            observe: options.observe,
            params: options.params,
        };

        return this._http.delete(preparedUrl, preparedOptions);
    }

    private prepareUrl(url: string, baseEndPoint: BaseEndpointsEnum) {
        let baseEndpointValue: string = this._baseEndpoints.get(baseEndPoint);

        return baseEndpointValue ? baseEndpointValue + url : this._defaultBaseEndpoint + url;
    }

    private getHeaders(headers: HttpHeaders): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }

        headers.set('Content-Type', 'application/json');
        return headers;
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
