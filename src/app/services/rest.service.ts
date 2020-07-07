import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRestGetOptions, IRestPostOptions, IRestCallOptions, IRestDeleteOptions } from '../interfaces';
import { environment } from '../../environments/environment';
import { SharedDataService } from './shared-data.service';
import { BaseEndpointsEnum } from '../enums';
import { ServiceInjector } from '../classes';

@Injectable({ providedIn: 'root' })
export class RestService {
    private readonly _defaultBaseEndpoint = environment.phdApiUrl;
    private readonly _baseEndpoints: Map<BaseEndpointsEnum, string> = new Map([
        [BaseEndpointsEnum.PhDSystemApi, environment.phdApiUrl],
    ]);

    public shared: SharedDataService;

    constructor(private readonly _http: HttpClient) {
        this.shared = ServiceInjector.injector.get(SharedDataService);
    }

    protected get(url: string, options: IRestGetOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);
        const observe = 'response';

        switch (options.responseType) {
            case 'blob':
                return this._http.get(preparedUrl, {
                    headers: preparedHeaders,
                    observe: observe,
                    responseType: 'blob',
                    params: options.params,
                });
            default:
                return this._http.get(preparedUrl, {
                    headers: preparedHeaders,
                    observe: observe,
                    params: options.params,
                });
        }
    }

    protected post(url: string, payload: object, options: IRestPostOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);
        const observe = 'response';

        switch (options.responseType) {
            case 'blob':
                return this._http.post(preparedUrl, payload, {
                    headers: preparedHeaders,
                    observe: observe,
                    responseType: 'blob',
                    params: options.params,
                });
            default:
                return this._http.post(preparedUrl, payload, {
                    headers: preparedHeaders,
                    observe: observe,
                    params: options.params,
                });
        }
    }

    protected put(url: string, payload: object, options: IRestCallOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);
        const observe = 'response';

        return this._http.put(preparedUrl, payload, {
            headers: preparedHeaders,
            observe: observe,
            params: options.params,
        });
    }

    protected delete(url: string, options: IRestDeleteOptions): Observable<HttpResponse<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers);
        const observe = 'response';

        return this._http.delete(preparedUrl, {
            headers: preparedHeaders,
            observe: observe,
            params: options.params,
        });
    }

    protected postFile(url: string, payload: object, options: IRestPostOptions): Observable<HttpEvent<Object>> {
        const preparedUrl = this.prepareUrl(url, options.baseEndPoint);
        const preparedHeaders = this.getHeaders(options.headers, options.skipContentType);
        const observe = 'events';

        return this._http.post(preparedUrl, payload, {
            headers: preparedHeaders,
            observe: observe,
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
