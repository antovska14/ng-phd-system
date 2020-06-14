import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';

import { SharedDataService } from './shared-data.service';
import { ServiceInjector } from '../classes';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
    shared: SharedDataService = ServiceInjector.injector.get(SharedDataService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.shared.currentUser.bearerToken;
        if (token) {
            const authenticatedRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token),
            });

            return next.handle(authenticatedRequest);
        }

        return next.handle(request);
    }
}

@NgModule({ providers: [{ provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true }] })
export class RestInterceptorModule {}
